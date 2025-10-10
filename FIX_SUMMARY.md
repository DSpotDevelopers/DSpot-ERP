# Time Log Date Attribution Fix - Summary

## Problem Description

The ERP system displayed time logs on incorrect dates when comparing the frontend daily view with the API report endpoint. Specifically:

- **Frontend Daily View**: Displayed logs on the date they **stopped** (if they overlapped with that date)
- **API Report**: Grouped logs by the date they **started** (in the user's timezone)

### Example of the Issue

A time log that:
- Started: September 30, 2025 23:00:00 (+03:00 timezone) = September 30, 2025 20:00:00 UTC
- Stopped: October 1, 2025 05:53:02 (+03:00 timezone) = October 1, 2025 02:53:02 UTC
- Duration: 21,182 seconds (5h 53m 2s)

**Before the fix:**
- Frontend showed this log on October 1st (because it overlapped)
- API report showed this log on September 30th (grouped by startedAt date)
- **Result**: Date mismatch causing confusion

## Root Cause

1. **Backend Query**: The time log service query includes logs where either `startedAt` OR `stoppedAt` falls within the requested date range (partial overlap allowed)
2. **Grouping Logic**: The report handlers grouped logs by `startedAt` date only, without considering multi-day logs
3. **Frontend Display**: The frontend displays all logs returned, converting timestamps to user's timezone

## Solution Implemented: Option 1 - Distribute Time Across Multiple Days

### Changes Made

#### 1. New Utility Functions (`time-log.utils.ts`)

Added two new functions to handle multi-day time log splitting:

```typescript
/**
 * Splits a time log that spans multiple days into separate log entries for each day.
 * Each resulting log will have the correct duration for that specific day in the given timezone.
 */
export function splitTimeLogAcrossDays(log: ITimeLog, timeZone: string): ITimeLog[]

/**
 * Expands an array of time logs by splitting any multi-day logs into separate entries per day.
 */
export function expandTimeLogsAcrossDays(logs: ITimeLog[], timeZone: string): ITimeLog[]
```

**How it works:**
- Takes a time log and checks if it spans multiple days in the given timezone
- If yes, splits it into separate log entries (one per day)
- Each segment gets the correct duration for that specific day
- Preserves all other properties from the original log

#### 2. Updated Report Handlers

Modified all four report grouping handlers to use the new splitting logic:

1. **GetTimeLogGroupByProjectHandler** - Groups by project, then date
2. **GetTimeLogGroupByEmployeeHandler** - Groups by employee, then date
3. **GetTimeLogGroupByDateHandler** - Groups by date, then project/employee
4. **GetTimeLogGroupByClientHandler** - Groups by client, project, then date

Each handler now calls `expandTimeLogsAcrossDays(timeLogs, timeZone)` before performing any grouping operations.

### Example: How the Fix Works

**Original Time Log:**
```json
{
  "startedAt": "2025-09-30T20:00:00Z",
  "stoppedAt": "2025-10-01T02:53:02Z",
  "duration": 21182,
  "projectId": "abc-123",
  "employeeId": "emp-456"
}
```

**After `splitTimeLogAcrossDays()` with timezone "+03:00":**

```json
[
  {
    "startedAt": "2025-09-30T20:00:00Z", // Sept 30 23:00 local
    "stoppedAt": "2025-09-30T20:59:59Z",  // Sept 30 23:59:59 local
    "duration": 3599,  // 59 minutes 59 seconds on Sept 30
    "projectId": "abc-123",
    "employeeId": "emp-456"
  },
  {
    "startedAt": "2025-09-30T21:00:00Z", // Oct 1 00:00 local
    "stoppedAt": "2025-10-01T02:53:02Z",  // Oct 1 05:53:02 local
    "duration": 17583, // 4 hours 53 minutes 3 seconds on Oct 1
    "projectId": "abc-123",
    "employeeId": "emp-456"
  }
]
```

**After grouping by date:**
- September 30: Shows 3,599 seconds (59m 59s)
- October 1: Shows 17,583 seconds (4h 53m 3s)

## Benefits

1. **Accurate Attribution**: Time is correctly attributed to each day it was worked
2. **Consistency**: Frontend and API reports now show the same data
3. **Billing Accuracy**: Important for daily billing/payroll calculations
4. **Analytics**: More accurate time tracking analytics and reports
5. **User Experience**: No more confusion about where time is logged

## Testing Recommendations

### Manual Testing

1. **Create a multi-day time log:**
   - Start: Today at 11:00 PM (your timezone)
   - Stop: Tomorrow at 6:00 AM (your timezone)
   - Duration: 7 hours

2. **Check the daily report API:**
   ```bash
   GET /api/timesheet/time-log/report/daily?organizationId=<id>&startDate=<today>&endDate=<tomorrow>&groupBy=project
   ```

3. **Verify the response:**
   - Should show 2 date entries
   - First date: ~1 hour duration (11 PM to midnight)
   - Second date: ~6 hours duration (midnight to 6 AM)

4. **Check the frontend daily view:**
   - Should match the API report for both days

### Edge Cases to Test

1. **Log spanning 3+ days** (e.g., 48+ hour log)
2. **Logs exactly at midnight boundary**
3. **Different timezones** (positive and negative UTC offsets)
4. **Very short logs** (< 1 minute) spanning midnight
5. **Stopped logs vs. running logs**

## Files Modified

1. `/packages/core/src/lib/time-tracking/time-log/time-log.utils.ts`
   - Added `splitTimeLogAcrossDays()` function
   - Added `expandTimeLogsAcrossDays()` function

2. `/packages/core/src/lib/time-tracking/time-log/commands/handlers/get-time-log-group-by-project.handler.ts`
   - Added log expansion before grouping

3. `/packages/core/src/lib/time-tracking/time-log/commands/handlers/get-time-log-group-by-employee.handler.ts`
   - Added log expansion before grouping

4. `/packages/core/src/lib/time-tracking/time-log/commands/handlers/get-time-log-group-by-date.handler.ts`
   - Added log expansion before grouping

5. `/packages/core/src/lib/time-tracking/time-log/commands/handlers/get-time-log-group-by-client.handler.ts`
   - Added log expansion before grouping

## Deployment Notes

- **Breaking Change**: No. The API response structure remains the same.
- **Database Migration**: Not required
- **Backward Compatibility**: Full backward compatibility maintained
- **Performance Impact**: Minimal - only affects logs that span multiple days

## Next Steps

1. Deploy changes to staging environment
2. Test with real data using the test scenarios above
3. Verify the specific issue mentioned (Sept 30 / Oct 1 log) is resolved
4. Monitor for any edge cases
5. Deploy to production after verification

---

**Implementation Date**: October 10, 2025
**Issue**: Time logs showing on incorrect dates in reports
**Solution**: Multi-day time log distribution with accurate duration allocation
