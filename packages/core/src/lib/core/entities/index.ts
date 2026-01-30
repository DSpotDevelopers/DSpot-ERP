import { AccountingTemplate } from '../../accounting-template/accounting-template.entity';
import { ActivityLog } from '../../activity-log/activity-log.entity';
import { ApiCallLog } from '../../api-call-log/api-call-log.entity';
import { AppointmentEmployee } from '../../appointment-employees/appointment-employees.entity';
import { ApprovalPolicy } from '../../approval-policy/approval-policy.entity';
import { SocialAccount } from '../../auth/social-account/social-account.entity';
import { AvailabilitySlot } from '../../availability-slots/availability-slots.entity';
import { CandidateCriterionsRating } from '../../candidate-criterions-rating/candidate-criterion-rating.entity';
import { CandidateDocument } from '../../candidate-documents/candidate-documents.entity';
import { CandidateEducation } from '../../candidate-education/candidate-education.entity';
import { CandidateExperience } from '../../candidate-experience/candidate-experience.entity';
import { CandidateFeedback } from '../../candidate-feedbacks/candidate-feedbacks.entity';
import { CandidateInterview } from '../../candidate-interview/candidate-interview.entity';
import { CandidateInterviewers } from '../../candidate-interviewers/candidate-interviewers.entity';
import { CandidatePersonalQualities } from '../../candidate-personal-qualities/candidate-personal-qualities.entity';
import { CandidateSkill } from '../../candidate-skill/candidate-skill.entity';
import { CandidateSource } from '../../candidate-source/candidate-source.entity';
import { CandidateTechnologies } from '../../candidate-technologies/candidate-technologies.entity';
import { Candidate } from '../../candidate/candidate.entity';
import { Contact } from '../../contact/contact.entity';
import { Country } from '../../country/country.entity';
import { Currency } from '../../currency/currency.entity';
import { CustomSmtp } from '../../custom-smtp/custom-smtp.entity';
import { DashboardWidget } from '../../dashboard/dashboard-widget/dashboard-widget.entity';
import { Dashboard } from '../../dashboard/dashboard.entity';
import { Deal } from '../../deal/deal.entity';
import { EmailHistory } from '../../email-history/email-history.entity';
import { EmailReset } from '../../email-reset/email-reset.entity';
import { EmailTemplate } from '../../email-template/email-template.entity';
import { EmployeeAppointment } from '../../employee-appointment/employee-appointment.entity';
import { EmployeeAvailability } from '../../employee-availability/employee-availability.entity';
import { EmployeeAward } from '../../employee-award/employee-award.entity';
import { EmployeeLevel } from '../../employee-level/employee-level.entity';
import { EmployeeNotificationSetting } from '../../employee-notification-setting/employee-notification-setting.entity';
import { EmployeeNotification } from '../../employee-notification/employee-notification.entity';
import { EmployeePhone } from '../../employee-phone/employee-phone.entity';
import { EmployeeRecentVisit } from '../../employee-recent-visit/employee-recent-visit.entity';
import { EmployeeRecurringExpense } from '../../employee-recurring-expense/employee-recurring-expense.entity';
import { EmployeeSetting } from '../../employee-setting/employee-setting.entity';
import { Employee } from '../../employee/employee.entity';
import { EntitySubscription } from '../../entity-subscription/entity-subscription.entity';
import { EquipmentSharingPolicy } from '../../equipment-sharing-policy/equipment-sharing-policy.entity';
import { EquipmentSharing } from '../../equipment-sharing/equipment-sharing.entity';
import { Equipment } from '../../equipment/equipment.entity';
import { EstimateEmail } from '../../estimate-email/estimate-email.entity';
import { ExpenseCategory } from '../../expense-categories/expense-category.entity';
import { Expense } from '../../expense/expense.entity';
import { ImportHistory } from '../../export-import/import-history/import-history.entity';
import { ImportRecord } from '../../export-import/import-record/import-record.entity';
import { Favorite } from '../../favorite/favorite.entity';
import { FeatureOrganization } from '../../feature/feature-organization.entity';
import { Feature } from '../../feature/feature.entity';
import { GoalGeneralSetting } from '../../goal-general-setting/goal-general-setting.entity';
import { GoalKPITemplate } from '../../goal-kpi-template/goal-kpi-template.entity';
import { GoalKPI } from '../../goal-kpi/goal-kpi.entity';
import { GoalTemplate } from '../../goal-template/goal-template.entity';
import { GoalTimeFrame } from '../../goal-time-frame/goal-time-frame.entity';
import { Goal } from '../../goal/goal.entity';
import { ImageAsset } from '../../image-asset/image-asset.entity';
import { Income } from '../../income/income.entity';
import { IntegrationEntitySettingTied } from '../../integration-entity-setting-tied/integration-entity-setting-tied.entity';
import { IntegrationEntitySetting } from '../../integration-entity-setting/integration-entity-setting.entity';
import { IntegrationMap } from '../../integration-map/integration-map.entity';
import { IntegrationSetting } from '../../integration-setting/integration-setting.entity';
import { IntegrationTenant } from '../../integration-tenant/integration-tenant.entity';
import { IntegrationType } from '../../integration/integration-type.entity';
import { Integration } from '../../integration/integration.entity';
import { Invite } from '../../invite/invite.entity';
import { InvoiceEstimateHistory } from '../../invoice-estimate-history/invoice-estimate-history.entity';
import { InvoiceItem } from '../../invoice-item/invoice-item.entity';
import { Invoice } from '../../invoice/invoice.entity';
import { KeyResultTemplate } from '../../keyresult-template/keyresult-template.entity';
import { KeyResultUpdate } from '../../keyresult-update/keyresult-update.entity';
import { KeyResult } from '../../keyresult/keyresult.entity';
import { Language } from '../../language/language.entity';
import { Mention } from '../../mention/mention.entity';
import { Merchant } from '../../merchant/merchant.entity';
import { OrganizationAward } from '../../organization-award/organization-award.entity';
import { OrganizationContact } from '../../organization-contact/organization-contact.entity';
import { OrganizationDepartment } from '../../organization-department/organization-department.entity';
import { OrganizationDocument } from '../../organization-document/organization-document.entity';
import { OrganizationEmploymentType } from '../../organization-employment-type/organization-employment-type.entity';
import { OrganizationLanguage } from '../../organization-language/organization-language.entity';
import { OrganizationPosition } from '../../organization-position/organization-position.entity';
import { OrganizationProjectModuleEmployee } from '../../organization-project-module/organization-project-module-employee.entity';
import { OrganizationProjectModule } from '../../organization-project-module/organization-project-module.entity';
import { OrganizationProjectEmployee } from '../../organization-project/organization-project-employee.entity';
import { OrganizationProject } from '../../organization-project/organization-project.entity';
import { OrganizationRecurringExpense } from '../../organization-recurring-expense/organization-recurring-expense.entity';
import { OrganizationSprintEmployee } from '../../organization-sprint/organization-sprint-employee.entity';
import { OrganizationSprintTaskHistory } from '../../organization-sprint/organization-sprint-task-history.entity';
import { OrganizationSprintTask } from '../../organization-sprint/organization-sprint-task.entity';
import { OrganizationSprint } from '../../organization-sprint/organization-sprint.entity';
import { OrganizationTaskSetting } from '../../organization-task-setting/organization-task-setting.entity';
import { OrganizationTeamEmployee } from '../../organization-team-employee/organization-team-employee.entity';
import { OrganizationTeamJoinRequest } from '../../organization-team-join-request/organization-team-join-request.entity';
import { OrganizationTeam } from '../../organization-team/organization-team.entity';
import { OrganizationVendor } from '../../organization-vendor/organization-vendor.entity';
import { Organization } from '../../organization/organization.entity';
import { PasswordReset } from '../../password-reset/password-reset.entity';
import { Payment } from '../../payment/payment.entity';
import { PipelineStage } from '../../pipeline-stage/pipeline-stage.entity';
import { Pipeline } from '../../pipeline/pipeline.entity';
import { ProductCategoryTranslation } from '../../product-category/product-category-translation.entity';
import { ProductCategory } from '../../product-category/product-category.entity';
import { ProductOptionGroupTranslation } from '../../product-option/product-option-group-translation.entity';
import { ProductOptionGroup } from '../../product-option/product-option-group.entity';
import { ProductOptionTranslation } from '../../product-option/product-option-translation.entity';
import { ProductOption } from '../../product-option/product-option.entity';
import { ProductVariantSetting } from '../../product-setting/product-setting.entity';
import { ProductTypeTranslation } from '../../product-type/product-type-translation.entity';
import { ProductType } from '../../product-type/product-type.entity';
import { ProductVariantPrice } from '../../product-variant-price/product-variant-price.entity';
import { ProductVariant } from '../../product-variant/product-variant.entity';
import { ProductTranslation } from '../../product/product-translation.entity';
import { Product } from '../../product/product.entity';
import { Reaction } from '../../reaction/reaction.entity';
import { ReportCategory } from '../../reports/report-category.entity';
import { ReportOrganization } from '../../reports/report-organization.entity';
import { RequestApprovalEmployee } from '../../request-approval-employee/request-approval-employee.entity';
import { RequestApprovalTeam } from '../../request-approval-team/request-approval-team.entity';
import { RequestApproval } from '../../request-approval/request-approval.entity';
import { ResourceLink } from '../../resource-link/resource-link.entity';
import { RolePermission } from '../../role-permission/role-permission.entity';
import { Role } from '../../role/role.entity';
import { Skill } from '../../skills/skill.entity';
import { TagType } from '../../tag-type/tag-type.entity';
import { Tag } from '../../tags/tag.entity';
import { DailyPlan } from '../../tasks/daily-plan/daily-plan.entity';
import { TaskEstimation } from '../../tasks/estimation/task-estimation.entity';
import { IssueType } from '../../tasks/issue-type/issue-type.entity';
import { TaskLinkedIssue } from '../../tasks/linked-issue/task-linked-issue.entity';
import { TaskPriority } from '../../tasks/priorities/priority.entity';
import { TaskProjectSequence } from '../../tasks/project-sequence/project-sequence.entity';
import { TaskRelatedIssueType } from '../../tasks/related-issue-type/related-issue-type.entity';
import { ScreeningTask } from '../../tasks/screening-tasks/screening-task.entity';
import { TaskSize } from '../../tasks/sizes/size.entity';
import { TaskStatus } from '../../tasks/statuses/status.entity';
import { Task } from '../../tasks/task.entity';
import { TaskVersion } from '../../tasks/versions/version.entity';
import { TaskView } from '../../tasks/views/view.entity';
import { TenantApiKey } from '../../tenant-api-key/tenant-api-key.entity';
import { TenantSetting } from '../../tenant/tenant-setting/tenant-setting.entity';
import { Tenant } from '../../tenant/tenant.entity';
import { TimeOffPolicy } from '../../time-off-policy/time-off-policy.entity';
import { TimeOffRequest } from '../../time-off-request/time-off-request.entity';
import { Activity } from '../../time-tracking/activity/activity.entity';
import { Screenshot } from '../../time-tracking/screenshot/screenshot.entity';
import { TimeLog } from '../../time-tracking/time-log/time-log.entity';
import { TimeSlotMinute } from '../../time-tracking/time-slot/time-slot-minute.entity';
import { TimeSlot } from '../../time-tracking/time-slot/time-slot.entity';
import { Timesheet } from '../../time-tracking/timesheet/timesheet.entity';
import { UserOrganization } from '../../user-organization/user-organization.entity';
import { User } from '../../user/user.entity';
import { WarehouseProductVariant } from '../../warehouse/warehouse-product-variant.entity';
import { WarehouseProduct } from '../../warehouse/warehouse-product.entity';
import { Warehouse } from '../../warehouse/warehouse.entity';
import { EventType } from '../../event-types/event-type.entity';
import { Comment } from '../../comment/comment.entity';
import { Report } from '../../reports/report.entity';

export const coreEntities = [
	AccountingTemplate,
	Activity,
	ActivityLog,
	ApiCallLog,
	AppointmentEmployee,
	ApprovalPolicy,
	AvailabilitySlot,
	Candidate,
	CandidateCriterionsRating,
	CandidateDocument,
	CandidateEducation,
	CandidateExperience,
	CandidateFeedback,
	CandidateInterview,
	CandidateInterviewers,
	CandidatePersonalQualities,
	CandidateSkill,
	CandidateSource,
	CandidateTechnologies,
	Comment,
	Contact,
	Country,
	Currency,
	CustomSmtp,
	DailyPlan,
	Dashboard,
	DashboardWidget,
	Deal,
	EmailHistory,
	EmailReset,
	EmailTemplate,
	Employee,
	EmployeeAppointment,
	EmployeeAvailability,
	EmployeeAward,
	EmployeeLevel,
	EmployeePhone,
	EmployeeRecentVisit,
	EmployeeRecurringExpense,
	EmployeeSetting,
	EmployeeNotification,
	EmployeeNotificationSetting,
	Equipment,
	EquipmentSharing,
	EquipmentSharingPolicy,
	EstimateEmail,
	EventType,
	Expense,
	ExpenseCategory,
	Favorite,
	Feature,
	FeatureOrganization,
	Goal,
	GoalGeneralSetting,
	GoalKPI,
	GoalKPITemplate,
	GoalTemplate,
	GoalTimeFrame,
	ImageAsset,
	ImportHistory,
	ImportRecord,
	Income,
	Integration,
	IntegrationEntitySetting,
	IntegrationEntitySettingTied,
	IntegrationMap,
	IntegrationSetting,
	IntegrationTenant,
	IntegrationType,
	Invite,
	Invoice,
	InvoiceEstimateHistory,
	InvoiceItem,
	IssueType,
	KeyResult,
	KeyResultTemplate,
	KeyResultUpdate,
	Language,
	Mention,
	Merchant,
	Organization,
	OrganizationAward,
	OrganizationContact,
	OrganizationDepartment,
	OrganizationDocument,
	OrganizationEmploymentType,
	OrganizationLanguage,
	OrganizationPosition,
	OrganizationProject,
	OrganizationProjectEmployee,
	OrganizationProjectModule,
	OrganizationProjectModuleEmployee,
	OrganizationRecurringExpense,
	OrganizationSprintEmployee,
	OrganizationSprintTask,
	OrganizationSprintTaskHistory,
	OrganizationSprint,
	OrganizationTaskSetting,
	OrganizationTeam,
	OrganizationTeamEmployee,
	OrganizationTeamJoinRequest,
	OrganizationVendor,
	PasswordReset,
	Payment,
	Pipeline,
	PipelineStage,
	Product,
	ProductCategory,
	ProductCategoryTranslation,
	ProductOption,
	ProductOptionGroup,
	ProductOptionGroupTranslation,
	ProductOptionTranslation,
	ProductTranslation,
	ProductType,
	ProductTypeTranslation,
	ProductVariant,
	ProductVariantPrice,
	ProductVariantSetting,
	Reaction,
	Report,
	ReportCategory,
	ReportOrganization,
	RequestApproval,
	RequestApprovalEmployee,
	RequestApprovalTeam,
	ResourceLink,
	Role,
	RolePermission,
	ScreeningTask,
	Screenshot,
	Skill,
	SocialAccount,
	EntitySubscription,
	Tag,
	TagType,
	Task,
	TaskEstimation,
	TaskLinkedIssue,
	TaskPriority,
	TaskProjectSequence,
	TaskRelatedIssueType,
	TaskSize,
	TaskStatus,
	TaskVersion,
	TaskView,
	TenantApiKey,
	Tenant,
	TenantSetting,
	TimeLog,
	TimeOffPolicy,
	TimeOffRequest,
	Timesheet,
	TimeSlot,
	TimeSlotMinute,
	User,
	UserOrganization,
	Warehouse,
	WarehouseProduct,
	WarehouseProductVariant
];
