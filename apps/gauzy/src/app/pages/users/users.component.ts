import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Cell, Settings } from 'angular2-smart-table';
import { filter, tap } from 'rxjs/operators';
import { debounceTime, firstValueFrom, Subject } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
	InvitationTypeEnum,
	PermissionsEnum,
	IOrganization,
	IUserOrganizationCreateInput,
	RolesEnum,
	IUser,
	ComponentLayoutStyleEnum,
	IRolePermission,
	IUserViewModel,
	ITag,
	IEmployee
} from '@gauzy/contracts';
import {
	EmployeesService,
	ErrorHandlingService,
	ServerDataSource,
	Store,
	ToastrService,
	UsersOrganizationsService
} from '@gauzy/ui-core/core';
import { API_PREFIX, ComponentEnum, distinctUntilChange } from '@gauzy/ui-core/common';
import {
	DateFormatPipe,
	DeleteConfirmationComponent,
	EmailComponent,
	InputFilterComponent,
	InviteMutationComponent,
	PaginationFilterBaseComponent,
	PictureNameTagsComponent,
	RoleComponent,
	TagsColorFilterComponent,
	TagsOnlyComponent,
	ToggleFilterComponent,
	UserMutationComponent,
	UserRoleFilterComponent
} from '@gauzy/ui-core/shared';
import { EmployeeWorkStatusComponent } from '../employees/table-components';
import { HttpClient } from '@angular/common/http';

@UntilDestroy({ checkProperties: true })
@Component({
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss'],
	standalone: false
})
export class UsersComponent extends PaginationFilterBaseComponent implements OnInit {
	public PermissionsEnum = PermissionsEnum;
	public users: IUser[] = [];
	public settingsSmartTable: Settings;
	public sourceSmartTable: ServerDataSource;
	public selectedUser: IUserViewModel;
	public userName = 'User';
	public loading: boolean;
	public hasSuperAdminPermission = false;
	public organizationInvitesAllowed = false;
	public showAddCard: boolean;
	public disableButton = true;
	public viewComponentName: ComponentEnum;
	public dataLayoutStyle = ComponentLayoutStyleEnum.TABLE;
	public componentLayoutStyleEnum = ComponentLayoutStyleEnum;
	public organization: IOrganization;
	public refresh$: Subject<boolean> = new Subject();
	public users$: Subject<boolean> = this.subject$;

	constructor(
		private readonly dialogService: NbDialogService,
		private readonly store: Store,
		private readonly router: Router,
		private readonly toastrService: ToastrService,
		private readonly errorHandlingService: ErrorHandlingService,
		private readonly route: ActivatedRoute,
		public readonly translateService: TranslateService,
		private readonly userOrganizationsService: UsersOrganizationsService,
		private readonly employeesService: EmployeesService,
		private readonly dateFormatPipe: DateFormatPipe,
		private readonly httpClient: HttpClient
	) {
		super(translateService);
		this.setView();
	}

	ngOnInit() {
		this._loadSmartTableSettings();
		this._applyTranslationOnSmartTable();
		this.users$
			.pipe(
				debounceTime(300),
				tap(() => this.cancel()),
				tap(() => this.getUsers()),
				untilDestroyed(this)
			)
			.subscribe();
		this.store.selectedOrganization$
			.pipe(
				debounceTime(100),
				distinctUntilChange(),
				filter((organization: IOrganization) => !!organization),
				tap((organization: IOrganization) => (this.organization = organization)),
				tap(({ invitesAllowed }: IOrganization) => (this.organizationInvitesAllowed = invitesAllowed)),
				tap(() => this.refresh$.next(true)),
				tap(() => this.users$.next(true)),
				untilDestroyed(this)
			)
			.subscribe();
		this.store.userRolePermissions$
			.pipe(
				filter((permissions: IRolePermission[]) => permissions.length > 0),
				untilDestroyed(this)
			)
			.subscribe(() => {
				this.hasSuperAdminPermission = this.store.hasPermission(PermissionsEnum.SUPER_ADMIN_EDIT);
			});
		this.route.queryParamMap
			.pipe(
				filter((params) => !!params && params.get('openAddDialog') === 'true'),
				debounceTime(1000),
				tap(() => this.add()),
				untilDestroyed(this)
			)
			.subscribe();
		this.pagination$
			.pipe(
				debounceTime(300),
				distinctUntilChange(),
				tap(() => this.users$.next(true)),
				untilDestroyed(this)
			)
			.subscribe();
		this.refresh$
			.pipe(
				filter(() => this._isGridLayout),
				tap(() => this.refreshPagination()),
				tap(() => (this.users = [])),
				untilDestroyed(this)
			)
			.subscribe();
	}

	/**
	 * Sets the view to the 'Users' component and updates the layout style.
	 * Subscribes to the layout changes and triggers necessary updates like pagination and data clearing.
	 */
	setView(): void {
		// Set the component view name
		this.viewComponentName = ComponentEnum.USERS;

		// Listen for layout changes related to the 'Users' component
		this.store
			.componentLayout$(this.viewComponentName)
			.pipe(
				// Avoid emitting if the layout style has not changed
				distinctUntilChange(),

				// Update the data layout style based on the emitted layout
				tap((componentLayout: ComponentLayoutStyleEnum) => {
					this.dataLayoutStyle = componentLayout;
					this._loadSmartTableSettings();
					this.refreshPagination();
				}),

				// Only proceed further if the current layout is grid-based
				filter(() => this._isGridLayout),

				// Clear the users array when switching to grid layout
				tap(() => (this.users = [])),

				// Trigger a refresh event for components relying on the subject$
				tap(() => this.users$.next(true)),

				// Automatically clean up the subscription when the component is destroyed
				untilDestroyed(this)
			)
			.subscribe();
	}

	/**
	 * Determines if the current layout style is set to grid (cards grid).
	 * This getter provides a clean and concise way to check the layout type.
	 *
	 * @returns A boolean indicating whether the layout style is 'CARDS_GRID'.
	 */
	private get _isGridLayout(): boolean {
		return this.componentLayoutStyleEnum.CARDS_GRID === this.dataLayoutStyle;
	}

	/**
	 * Handles the selection of a user from the list.
	 * Updates the selected user, enables/disables the button,
	 * and checks specific conditions like user role and permissions.
	 *
	 * @param param0 - The selection event containing user data.
	 * @param param0.isSelected - Indicates if the user is selected.
	 * @param param0.data - The data object of the selected user.
	 */
	selectUser({ isSelected, data }: { isSelected: boolean; data: any }): void {
		// Toggle the button state and update the selected user
		this.disableButton = !isSelected;
		this.selectedUser = isSelected ? data : null;

		// Set the user's display name or default to 'User'
		this.userName = data?.fullName?.trim() || 'User';

		// Handle SUPER_ADMIN role-specific logic
		if (data?.role?.name === RolesEnum.SUPER_ADMIN) {
			this.disableButton = this.hasSuperAdminPermission;
			this.selectedUser = this.hasSuperAdminPermission ? this.selectedUser : null;
		}
	}

	/**
	 * Opens a dialog to add a new user and handles the response.
	 * If a user is added successfully, displays a success message and triggers updates for related components.
	 */
	async add(): Promise<void> {
		// Open the user mutation dialog
		const dialog = this.dialogService.open(UserMutationComponent);

		// Wait for the dialog to close and retrieve the data
		const data = await firstValueFrom(dialog.onClose);

		// Check if data exists and contains a user
		if (data && data.user) {
			// Construct the user's full name if first or last name is provided
			if (data.user.firstName || data.user.lastName) {
				this.userName = `${data.user.firstName || ''} ${data.user.lastName || ''}`.trim();
			}

			// Display a success message using ToastrService
			this.toastrService.success('NOTES.ORGANIZATIONS.ADD_NEW_USER_TO_ORGANIZATION', {
				username: this.userName,
				orgname: this.store.selectedOrganization.name
			});

			// Notify subscribers about the update
			this.refresh$.next(true);
			this.users$.next(true);
		}
	}

	/**
	 * Adds or edits a user in the organization based on the input data.
	 * If the user is active, creates the user and triggers updates for related components.
	 *
	 * @param user - The user data to be added or edited.
	 */
	async addOrEditUser(user: IUserOrganizationCreateInput): Promise<void> {
		// Check if the user is active
		if (user.isActive) {
			// Create the user in the organization and wait for the operation to complete
			await firstValueFrom(this.userOrganizationsService.create(user));

			// Show a success message using ToastrService
			this.toastrService.success('NOTES.ORGANIZATIONS.ADD_NEW_USER_TO_ORGANIZATION', {
				username: this.userName.trim(),
				orgname: this.store.selectedOrganization.name
			});

			// Trigger updates for other components or subscribers
			this.refresh$.next(true);
			this.users$.next(true);
		}
	}

	/**
	 * Opens a dialog for inviting a user.
	 * Uses the `InviteMutationComponent` with the context set to user invitation.
	 * Waits for the dialog to close before proceeding.
	 */
	async invite(): Promise<void> {
		// Open the invite dialog with the specified context
		const dialog = this.dialogService.open(InviteMutationComponent, {
			context: {
				invitationType: InvitationTypeEnum.USER
			}
		});

		// Wait for the dialog to close and handle any resulting actions (if needed)
		await firstValueFrom(dialog.onClose);
	}

	/**
	 * Navigates to the edit page for a selected user.
	 * If a user is passed as a parameter, it selects that user before navigation.
	 *
	 * @param selectedItem - The user object to edit (optional).
	 */
	edit(selectedItem?: IUser): void {
		// If a user is provided, select that user
		if (selectedItem) {
			this.selectUser({
				isSelected: true,
				data: selectedItem
			});
		}

		// Navigate to the edit page of the selected user
		if (this.selectedUser?.id) {
			this.router.navigate(['/pages/users/edit/' + this.selectedUser.id]);
		}
	}

	/**
	 * Navigates to the user invites management page.
	 */
	manageInvites(): void {
		this.router.navigate(['/pages/users/invites/']);
	}

	/**
	 * Opens a dialog for deleting a user.
	 * If a user is passed as a parameter, it selects that user before navigation.
	 *
	 * @param selectedItem
	 */
	async delete(selectedItem?: IUser) {
		if (selectedItem) {
			this.selectUser({
				isSelected: true,
				data: selectedItem
			});
		}
		this.dialogService
			.open(DeleteConfirmationComponent, {
				context: {
					recordType: this.selectedUser.fullName + ' ' + this.getTranslation('FORM.DELETE_CONFIRMATION.USER')
				}
			})
			.onClose.pipe(untilDestroyed(this))
			.subscribe(async (result) => {
				if (result) {
					try {
						const username = this.userName;

						await this.userOrganizationsService.setUserAsInactive(this.selectedUser?.id);
						this.toastrService.success('NOTES.ORGANIZATIONS.DELETE_USER_FROM_ORGANIZATION', { username });

						this.refresh$.next(true);
						this.users$.next(true);
					} catch (error) {
						this.toastrService.danger(error);
					}
				}
			});
	}

	/**
	 * Cancels the current operation and hides the add card form.
	 * Resets the `showAddCard` flag to `false`.
	 */
	cancel(): void {
		this.showAddCard = false;
	}

	/**
	 * Remove user from organization based on user organization ID.
	 *
	 * @param selectedOrganization The selected user organization to remove the user from.
	 */
	async removeUserFromOrganization(selectedOrganization: IUserViewModel) {
		const { userOrganizationId } = selectedOrganization;
		const fullName = selectedOrganization.fullName.trim() || selectedOrganization.email;

		/**
		 *  User belongs to only 1 organization -> delete user
		 *	User belongs multiple organizations -> remove user from Organization
		 */
		const count = await this.userOrganizationsService.getUserOrganizationCount(userOrganizationId);
		const confirmationMessage =
			count === 1 ? 'FORM.DELETE_CONFIRMATION.DELETE_USER' : 'FORM.DELETE_CONFIRMATION.REMOVE_USER';

		// Open a confirmation dialog for the hiring action.
		const dialogRef = this.dialogService.open(DeleteConfirmationComponent, {
			context: {
				recordType: `${fullName} ${this.getTranslation(confirmationMessage)}`
			}
		});

		// Open confirmation dialog for user action
		dialogRef.onClose
			.pipe(
				untilDestroyed(this) // Ensures the observable is properly managed to prevent memory leaks.
			)
			.subscribe(async (result) => {
				if (!result) return; // If the dialog is closed without confirmation, exit the function.

				try {
					// If user confirms deletion, proceed with removal from organization
					await this.userOrganizationsService.removeUserFromOrg(userOrganizationId);

					this.toastrService.success('USERS_PAGE.REMOVE_USER', { name: fullName });
				} catch (error) {
					console.error('Failed to remove user from organization:', error.message);
					// Handle errors during the removal process
					this.errorHandlingService.handleError(error);
				} finally {
					// Perform cleanup or refresh actions
					this.refresh$.next(true);
					this.users$.next(true);
				}
			});
	}

	/**
	 * Fetches user organizations with necessary relations.
	 *
	 * @returns A promise that resolves to an array of IUserOrganization.
	 */
	private async setSmartTableSource(): Promise<void> {
		if (!this.organization) return;

		this.loading = true;

		const { tenantId, id: organizationId } = this.organization;

		this.sourceSmartTable = new ServerDataSource(this.httpClient, {
			endPoint: `${API_PREFIX}/user-organization/pagination`,
			relations: ['user', 'user.role', 'user.tags'],
			withDeleted: false,
			where: {
				organizationId,
				tenantId,
				...(this.filters.where ? this.filters.where : {})
			},
			resultMap: (userOrg: any) => {
				const { user, id: userOrganizationId, isActive } = userOrg;

				if (!user) return null;

				return {
					id: user.id,
					fullName: user.name,
					email: user.email,
					tags: user.tags,
					imageUrl: user.imageUrl,
					role: user.role,
					isActive,
					userOrganizationId,
					...this.employeeMapper(user.employee)
				};
			},
			finalize: async () => {
				this.updatePagination(this.sourceSmartTable.count());
				this.loading = false;
			}
		});
	}

	/**
	 * Loads users into the smart table with pagination and updates pagination.
	 *
	 * @param users The array of users to load into the smart table.
	 * @param activePage The active page for pagination.
	 * @param itemsPerPage The number of items per page for pagination.
	 */
	private async getUsers(): Promise<void> {
		if (!this.organization) return;

		try {
			this.setSmartTableSource();

			const { activePage, itemsPerPage } = this.getPagination();
			this.sourceSmartTable.setPaging(activePage, itemsPerPage, false);

			if (this.dataLayoutStyle === ComponentLayoutStyleEnum.CARDS_GRID) {
				await this.sourceSmartTable.getElements();
				this.users.push(...this.sourceSmartTable.getData());
			}
		} catch (error) {
			console.error('Error while getting organization users', error?.message);
			this.toastrService.danger(error);
		} finally {
			this.loading = false;
		}
	}

	/**
	 * Update pagination information
	 * @param totalItems - Total items returned from the server
	 */
	private updatePagination(totalItems: number) {
		this.setPagination({
			...this.getPagination(),
			totalItems
		});
	}

	/**
	 * Helper function to create a reusable filter function for columns.
	 * @param field - The field to filter by.
	 */
	private _getFilterFunction(field: string) {
		return (value: string) => {
			this.setFilter({ field, search: value });
			return value?.length > 0; // Return `true` if the value is non-empty
		};
	}

	/**
	 *
	 */
	private _loadSmartTableSettings() {
		// Get pagination settings
		const { itemsPerPage } = this.getPagination() || { itemsPerPage: this.minItemPerPage };
		this.settingsSmartTable = {
			actions: false,
			sortMode: 'single',
			pager: {
				display: false,
				perPage: itemsPerPage
			},
			columns: {
				fullName: {
					title: this.getTranslation('SM_TABLE.FULL_NAME'),
					type: 'custom',
					class: 'align-row',
					width: '20%',
					isSortable: false,
					isFilterable: true,
					renderComponent: PictureNameTagsComponent,
					componentInitFunction: (instance: PictureNameTagsComponent, cell: Cell) => {
						instance.rowData = cell.getRow().getData();
						instance.value = cell.getValue();
					},
					filter: {
						type: 'custom',
						component: InputFilterComponent,
						config: {
							initialValueInput: this.filters?.where?.user?.name ?? null
						}
					},
					filterFunction: this._getFilterFunction('user.name')
				},
				email: {
					title: this.getTranslation('SM_TABLE.EMAIL'),
					type: 'custom',
					class: 'align-row',
					width: '20%',
					isFilterable: true,
					isSortable: false,
					renderComponent: EmailComponent,
					componentInitFunction: (instance: EmailComponent, cell: Cell) => {
						instance.rowData = cell.getRow().getData();
					},
					filter: {
						type: 'custom',
						component: InputFilterComponent,
						config: {
							initialValueInput: this.filters?.where?.user?.email ?? null
						}
					},
					filterFunction: this._getFilterFunction('user.email')
				},
				role: {
					title: this.getTranslation('SM_TABLE.ROLE'),
					type: 'custom',
					width: '10%',
					renderComponent: RoleComponent,
					componentInitFunction: (instance: RoleComponent, cell: Cell) => {
						instance.value = cell.getRawValue();
					},
					filter: {
						type: 'custom',
						component: UserRoleFilterComponent,
						config: {
							initialValueInput: this.filters?.where?.user?.role?.name ?? null
						}
					},
					filterFunction: this._getFilterFunction('user.role.name')
				},
				tags: {
					title: this.getTranslation('SM_TABLE.TAGS'),
					type: 'custom',
					width: '10%',
					isSortable: false,
					isFilterable: true,
					renderComponent: TagsOnlyComponent,
					componentInitFunction: (instance: TagsOnlyComponent, cell: Cell) => {
						instance.rowData = cell.getRow().getData();
						instance.value = cell.getValue();
					},
					filter: {
						type: 'custom',
						component: TagsColorFilterComponent,
						config: {
							initialValueIds: this.filters?.where?.tags ?? null
						}
					},
					filterFunction: (tags: ITag[]) => {
						const tagIds = Array.isArray(tags) ? tags.map((tag) => tag.id) : [];
						this.setFilter({
							field: 'tags',
							search: tagIds.length > 0 ? [...tagIds] : null
						});
						return false;
					}
				},
				status: {
					title: this.getTranslation('SM_TABLE.STATUS'),
					type: 'custom',
					width: '10%',
					isFilterable: true,
					isSortable: false,
					filter: {
						type: 'custom',
						component: ToggleFilterComponent
					},
					filterFunction: (isActive: boolean) => {
						this.setFilter({ field: 'isActive', search: isActive });
						return isActive;
					},
					renderComponent: EmployeeWorkStatusComponent,
					componentInitFunction: (instance: EmployeeWorkStatusComponent, cell: Cell) => {
						instance.rowData = cell.getRow().getData();
					}
				}
			}
		};
	}

	/**
	 * Subscribes to language change events and reloads smart table settings accordingly.
	 */
	private _applyTranslationOnSmartTable(): void {
		this.translateService.onLangChange
			.pipe(
				tap(() => this._loadSmartTableSettings()),
				untilDestroyed(this)
			)
			.subscribe();
	}

	/*
	 * Clear selected item
	 */
	clearItem() {
		this.selectUser({
			isSelected: false,
			data: null
		});
	}

	/**
	 * Maps an employee object to a simplified format.
	 *
	 * @param employee The employee object to be mapped.
	 * @returns An object containing mapped employee properties.
	 */
	private employeeMapper(employee: IEmployee): any {
		if (!employee) {
			return {};
		}

		const { endWork, startedWorkOn, isTrackingEnabled, id } = employee;
		// "Range" when was hired and when exit
		const start = this.dateFormatPipe.transform(startedWorkOn, null, 'LL');
		const end = this.dateFormatPipe.transform(endWork, null, 'LL');

		const workStatus = [start, end].filter(Boolean).join(' - ');

		return {
			employeeId: id,
			endWork: endWork ? new Date(endWork) : null,
			workStatus: endWork ? workStatus : '',
			startedWorkOn,
			employee,
			isTrackingEnabled
		};
	}

	/**
	 * Checks if the user is an employee.
	 *
	 * @param user The user to check.
	 * @returns True if the user is an employee, otherwise false.
	 */
	private isEmployee(): boolean {
		return !!this.selectedUser?.employeeId;
	}

	/**
	 * Converts a selected user to an employee on the users page.
	 *
	 * This method registers the selected user as an employee within the currently selected organization,
	 * provided the user hasn't already been registered as an employee.
	 *
	 * Preconditions:
	 * - A valid user must be selected.
	 * - The user must not already have an employee ID.
	 * - The organization details must be available.
	 *
	 * @throws {Error} Logs an error if the employee registration process fails.
	 *
	 * @returns {Promise<void>} Resolves when the user is successfully registered as an employee or does nothing if preconditions aren't met.
	 */
	async convertUserToEmployee(): Promise<void> {
		if (!this.selectedUser || !this.organization || this.isEmployee()) {
			return;
		}

		const { id: organizationId, tenantId } = this.organization;
		const { id: userId } = this.selectedUser;

		try {
			await firstValueFrom(
				this.employeesService.create({
					startedWorkOn: null, // Default start date is null (can be updated later)
					userId,
					organizationId,
					tenantId
				})
			);
			this.toastrService.success('USERS_PAGE.CONVERT_USER_TO_EMPLOYEE');
		} catch (error) {
			console.error('Error while converting user to employee:', error);
			this.toastrService.danger(error);
		}
	}

	// Method to toggle the 'showAddCard' state
	toggleAddCard(): void {
		this.showAddCard = !this.showAddCard;
	}
}
