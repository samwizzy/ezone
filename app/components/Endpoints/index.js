import { BaseUrl } from '../BaseUrl';

/** *****************************************************************
 * Authentication endpoint
 ******************************************************************* */

// Authentication Apis
export const RegistrationUrl = `${BaseUrl}/authserv/api/v1/register`;
export const LoginUrl = `${BaseUrl}/authserv/oauth/token`;
export const UserProfileUrl = `${BaseUrl}/authserv/api/v1/users/profile`;
export const ForgotPasswordApi = `${BaseUrl}/authserv/api/v1/user/password/forgot`;

/** *****************************************************************
 * Organization and Company structure endpoint
 ******************************************************************* */

// Company structure Apis
export const CompanyInfoUrl = `${BaseUrl}/authserv/api/v1/organisation`;
export const UpdateCompanyInfoUrl = `${BaseUrl}/authserv/api/v1/update_organization`;
export const GetPartyGroup = `${BaseUrl}/authserv/api/v1/organisation/partygroups`;
export const CreateNewPartyGroup = `${BaseUrl}/authserv/api/v1/partygroup`;
export const UpdatePartyGroup = `${BaseUrl}/authserv/api/v1/partygroup`;
export const CreateNewPartyApi = `${BaseUrl}/authserv/api/v1/party/create_and_add_to_group`;
export const UpdatePartyApi = `${BaseUrl}/authserv/api/v1/party`;
export const CreateNewPartiesApi = `${BaseUrl}/authserv/api/v1/party/create_and_add_to_party`;
export const GetPartyByIdApi = `${BaseUrl}/authserv/api/v1/party/get_by_id`;
export const GetPartyTags = `${BaseUrl}/authserv/api/v1/party_tags`;
export const UpdatePartiesApi = `${BaseUrl}/authserv/api/v1/party`;
export const CreateNewPositionApi = `${BaseUrl}/authserv/api/v1/position`;
export const UpdatePositionApi = `${BaseUrl}/authserv/api/v1/position/update_position`;
export const GetAllPositionsApi = `${BaseUrl}/authserv/api/v1/position/get_position_by_orgId`;
export const AddNewEmployeeToPositionApi = `${BaseUrl}/authserv/api/v1/user/add_to_position`;
export const GetAllTagsApi = `${BaseUrl}/authserv/api/v1/party_tags`;

/** *****************************************************************
 * User endpoint
 ******************************************************************* */

export const CreateNewEmployeeApi = `${BaseUrl}/authserv/api/v1/user`;
export const GetAllUsersApi = `${BaseUrl}/authserv/api/v1/users/get_by_orgid`;
export const GetEmployeesApi = `${BaseUrl}/authserv/api/v1/users`;
export const GetBranchEmployeesApi = `${BaseUrl}/authserv/api/v1/users/get_branch_employees`;
export const GetDeptEmployeesApi = `${BaseUrl}/authserv/api/v1/users/get_department_employees`;
export const GetUserByUUIDApi = `${BaseUrl}/authserv/api/v1/users/get_by_uuid`;
export const UpdateUserProfileApi = `${BaseUrl}/authserv/api/v1/user/update_profile`;

/** *****************************************************************
 * Roles Rights endpoint
 ******************************************************************* */

export const CreateModuleApi = `${BaseUrl}/authserv/api/v1/modules/add`;
export const UpdateModuleApi = `${BaseUrl}/authserv/api/v1/modules/update`;
export const GetModuleByIdApi = `${BaseUrl}/authserv/api/v1/modules/{id}`;
export const GetModulesApi = `${BaseUrl}/authserv/api/v1/modules`;

export const CreateRoleApi = `${BaseUrl}/authserv/api/v1/roles/add`;
export const UpdateRoleApi = `${BaseUrl}/authserv/api/v1/roles/update`;
export const GetRoleByIdApi = `${BaseUrl}/authserv/api/v1/roles/{id}`;
export const GetRolesApi = `${BaseUrl}/authserv/api/v1/roles`;
export const GetRightsByRoleIdApi = `${BaseUrl}/authserv/api/v1/role`;

export const CreateRightApi = `${BaseUrl}/authserv/api/v1/rights/add`;
export const UpdateRightApi = `${BaseUrl}/authserv/api/v1/rights/update`;
export const GetRightByIdApi = `${BaseUrl}/authserv/api/v1/rights/{id}`;
export const GetRightsApi = `${BaseUrl}/authserv/api/v1/rights`;

export const CreateRoleRightsApi = `${BaseUrl}/authserv/api/v1/roleRights/add`;
export const UpdateRoleRightsApi = `${BaseUrl}/authserv/api/v1/roleRights/update`;
export const GetRoleRightsByIdApi = `${BaseUrl}/authserv/api/v1/roleRights/{id}`;
export const GetRolesRightsApi = `${BaseUrl}/authserv/api/v1/roleRights`;

/** *****************************************************************
 * Utility endpoint
 ******************************************************************* */

// Utility Apis
// Folder Api
export const InitFolderDirApi = `${BaseUrl}/utilityserv/api/v1/folder/init_directories`;
export const GetAllFoldersAndDocApi = `${BaseUrl}/utilityserv/api/v1/folder/get_all_folders_by_type`;
export const AddFolderToFolderApi = `${BaseUrl}/utilityserv/api/v1/folder/create_and_add_to_folder`;

// File Api
export const AddDocToFolderApi = `${BaseUrl}/utilityserv/api/v1/document/add_to_folder`;
export const CreateUtilityFileApi = `${BaseUrl}/utilityserv/api/v1/upload_document`;
export const GetUtilityFilesApi = `${BaseUrl}/utilityserv/api/v1/get_document_by_orgid`;
export const GetUtilityFileApi = `${BaseUrl}/utilityserv/api/v1/get_document_by_id`;
export const DeleteUtilityFileApi = `${BaseUrl}/utilityserv/api/v1/document/delete_document`;
export const RestoreDocumentApi = `${BaseUrl}/utilityserv/api/v1/document/restore_document/{id}/{type}`;

export const GetFavoriteDocumentApi = `${BaseUrl}/utilityserv/api/v1/get_favourite_by_uuid`;
export const GetFavoriteDocApi = `${BaseUrl}/utilityserv/api/v1/document/get_favourite_document`;
export const FavoriteDocumentApi = `${BaseUrl}/utilityserv/api/v1/favourite_document`;
export const UnfavoriteDocumentApi = `${BaseUrl}/utilityserv/api/v1/unfavourite_document`;
export const ShareDocumentApi = `${BaseUrl}/utilityserv/api/v1/document/share_document`;
export const GetShareDocumentApi = `${BaseUrl}/utilityserv/api/v1/share_document/get_shared_document_by_uuid`;
export const GenerateLinkAndSendEmailApi = `${BaseUrl}/utilityserv/api/v1/share_document/send_email_to_file_owner/{userId}/{sharedId}`;

// Task Api
export const GetUtilityTasksApi = `${BaseUrl}/utilityserv/api/v1/get_tasks_by_orgid`;
export const GetUtilityTaskApi = `${BaseUrl}/utilityserv/api/v1/task`;
export const GetTaskByStatusApi = `${BaseUrl}/utilityserv/api/v1/task/get_task_by_status`;
export const UpdateUtilityTaskApi = `${BaseUrl}/utilityserv/api/v1/task/update_task`;
export const DeleteUtilityTaskApi = `${BaseUrl}/utilityserv/api/v1/task/delete_task`;
export const CreateUtilityTasksApi = `${BaseUrl}/utilityserv/api/v1/task`;
export const GetUtilityTasksByStatusApi = `${BaseUrl}/utilityserv/api/v1/get_by_orgid_and_status`;
export const GetTaskByOrgIdAndCreatedByApi = `${BaseUrl}/utilityserv/api/v1/task/get_tasks_by_orgid_and_createdby/{orgid}/{createdby}`;
export const GetActiveTaskByOrgIdApi = `${BaseUrl}/utilityserv/api/v1/task/get_active_tasks_by_orgid/{orgid}`;
export const AddTaskAttachmentApi = `${BaseUrl}/utilityserv/api/v1/task/add_attachments`;
export const RemoveTaskAttachmentApi = `${BaseUrl}/utilityserv/api/v1/task/remove_attachments`;
export const TaskCommentApi = `${BaseUrl}/utilityserv/api/v1/comment/add_comment`;
export const GetAllCommentByTaskIdApi = `${BaseUrl}/utilityserv/api/v1/comment/get_all_comment_by_taskid`;

// Chat Api
export const GetUserChatApi = `${BaseUrl}/utilityserv/api/v1/chat/get_user_chat`;
export const GetUserChatDataApi = `${BaseUrl}/utilityserv/api/v1/message/get_messages_for_chat`;
export const SendMessageApi = `${BaseUrl}/utilityserv/api/v1/message/send_message`;
export const SendFcmDataApi = `${BaseUrl}/utilityserv/api/v1/fcm/update_client_fcm_token`;

/** *****************************************************************
 * HR Module
 ******************************************************************* */
// Employee Api
export const EmployeeApi = `${BaseUrl}/hrserv/api/v1/employee`;
export const EmployeesApi = `${BaseUrl}/hrserv/api/v1/employees`;
export const EmployeesByOrgIdApi = `${BaseUrl}/hrserv/api/v1/employees/for_organinisation/{orgId}`;
export const GetEmployeeByIdApi = `${BaseUrl}/hrserv/api/v1/employees/{employeeId}`;
export const GetEmployeeByDeptApi = `${BaseUrl}/hrserv/api/v1/employees/by_department/{departmentId}`;
export const GetEmployeeByTypeApi = `${BaseUrl}/hrserv/api/v1/employees/by_employee_type`;
export const GetEmployeeByLocationApi = `${BaseUrl}/hrserv/api/v1/employees/by_location`;
export const GetEmployeeByRoleApi = `${BaseUrl}/hrserv/api/v1/employees/by_role`;

export const GetEmployeeTypes = `${BaseUrl}/authserv/api/v1/generic_entities/for_organinisation`;
export const CreateEmployeeType = `${BaseUrl}/authserv/api/v1/generic_entity/add`;
export const CreateEmployee = `${BaseUrl}/authserv/api/v1/user`;
export const GetEmployeesByOrgIdApi = `${BaseUrl}/authserv/api/v1/users/get_by_orgid`;

export const GetEnrollmentTypes = `${BaseUrl}/authserv/api/v1/generic_entities/for_organinisation`;
export const GetLocations = `${BaseUrl}/authserv/api/v1/generic_entities/for_organinisation`;

// Job openings
export const GetJobOpenings = `${BaseUrl}/authserv/api/v1/job_openings/for_organisation`;
export const CreateJobOpening = `${BaseUrl}/authserv/api/v1/job_opening`;
export const GetJobOpeningDetails = `${BaseUrl}/authserv/api/v1/job_openings/get_by_id`;

// Job applications
export const GetJobApplications = `${BaseUrl}/authserv/api/v1/job_applications/for_organinisation`;
export const GetJobApplicationsByWE = `${BaseUrl}/authserv/api/v1/job_applications/by_work_experience`;
export const GetJobApplicationsByStatus = `${BaseUrl}/authserv/api/v1/job_applications/by_status`;
export const GetJobApplicationsByJobOpening = `${BaseUrl}/authserv/api/v1/job_applications/for_job_opening/{jobOpeningId}`;
export const CreateJobApplication = `${BaseUrl}/authserv/api/v1/job_application`;

// HR:Performance - Goals
export const GetPerformanceApi = `${BaseUrl}/authserv/api/v1/performance/get_by_orgid`;
export const CreatePerformanceApi = `${BaseUrl}/authserv/api/v1/performance/add`;
export const GetPerformanceByIdApi = `${BaseUrl}/authserv/api/v1/performance/get_by_id`;
export const UpdatePerformance = `${BaseUrl}/authserv/api/v1/performance/update`;
export const PerformanceCommentApi = `${BaseUrl}/authserv/api/v1/performance/comment`;
// HR:Performance - Recognition
export const GetRecognitionApi = `${BaseUrl}/authserv/api/v1/recognition/get_by_orgid`;
export const CreateRecognitionApi = `${BaseUrl}/authserv/api/v1/recognition/add`;
export const GetRecognitionByIdApi = `${BaseUrl}/authserv/api/v1/recognition/get_by_id`;
export const UpdateRecognition = `${BaseUrl}/authserv/api/v1/recognition/update`;
export const RecognitionCommentApi = `${BaseUrl}/authserv/api/v1/recognition/comment`;
// HR:Performance - Reviews
export const GetReviewsApi = `${BaseUrl}/authserv/api/v1/review/get_by_orgid`;
export const CreateReviewApi = `${BaseUrl}/authserv/api/v1/review`;
export const GetReviewByIdApi = `${BaseUrl}/authserv/api/v1/review/{id}`;
export const UpdateReview = `${BaseUrl}/authserv/api/v1/review/update`;

// HR:Leave-Management - Leave Request
export const GetLeaveRequestsApi = `${BaseUrl}/authserv/api/v1/all_leave_requests_by_orgid`;
export const CreateLeaveRequestApi = `${BaseUrl}/authserv/api/v1/add_leave_request`;
export const GetLeaveRequestByIdApi = `${BaseUrl}/authserv/api/v1/leave_requests_by_id/{id}`;
export const ApproveLeaveRequestApi = `${BaseUrl}/authserv/api/v1/approve_leave_request/{leaveRequestId}`;
export const RejectLeaveRequestApi = `${BaseUrl}/authserv/api/v1/reject_leave_request/{leaveRequestId}`;
export const UpdateLeaveRequestApi = `${BaseUrl}/authserv/api/v1/update_leave_request/{leaveRequestId}`;

// HR:Leave-Management - Leave Type
export const GetLeaveTypesApi = `${BaseUrl}/authserv/api/v1/all_leave_types_by_orgid`;
export const CreateLeaveTypeApi = `${BaseUrl}/authserv/api/v1/add_leave_type`;
export const DeleteEmployeeByLeaveTypeApi = `${BaseUrl}/authserv/api/v1/remove_employee_from_leave_type/{leaveTypeId}`;
export const UpdateLeaveTypeApi = `${BaseUrl}/authserv/api/api/v1/update_leave_type/{id}`;

// Roles
export const GetRoles = `${BaseUrl}/authserv/api/v1/generic_entities/for_organinisation`;
export const CreateRole = `${BaseUrl}/authserv/api/v1/generic_entity/add`;

// Department
export const DepartmentApi = `${BaseUrl}/hrserv/api/v1/department`;
export const DepartmentsApi = `${BaseUrl}/hrserv/api/v1/departments`;
export const GetDepartmentsByIdApi = `${BaseUrl}/hrserv/api/v1/departments/{id}`;
export const GetDepartmentsByParentIdApi = `${BaseUrl}/hrserv/api/v1/departments/by_parent/{parentId}`;
// export const GetDepartmentsByOrgIdApi = `${BaseUrl}/authserv/api/v1/organisation/parties`;
export const GetPartyGroups = `${BaseUrl}/authserv/api/v1/organisation/partygroups`;
export const GetDepartmentsByOrgIdApi = `${BaseUrl}/authserv/api/v1/organisation_and_tag/parties`;
export const GetBranches = `${BaseUrl}/authserv/api/v1/organisation_and_tag/parties`;
export const CreateDepartment = `${BaseUrl}/authserv/api/v1/party/create_and_add_to_group`;
export const CreateBranch = `${BaseUrl}/authserv/api/v1/party/create_and_add_to_group`;

export const CreateAnnouncement = `${BaseUrl}/authserv/api/v1/announcement`;

export const GetAnnouncements = `${BaseUrl}/authserv/api/v1/announcements/for_organization`;
export const AnnouncementComment = `${BaseUrl}/authserv/api/v1/announcement/comment`;

// HR:Attendance API
export const GetAttendances = `${BaseUrl}/authserv/api/v1/find_attendance_by_orgid`;
export const CreateAttendanceApi = `${BaseUrl}/authserv/api/v1/add_attendance`;
export const GetDays = `${BaseUrl}/authserv/api/v1/all_days`;
export const CreateShift = `${BaseUrl}/authserv/api/v1/add_shift`;
export const GetShifts = `${BaseUrl}/authserv/api/v1/find_shift_by_orgid`;
export const AssignShift = `${BaseUrl}/authserv/api/v1/assign_shift_to_users`;
export const AssignPartyToShift = `${BaseUrl}/authserv/api/v1/assign_shift_to_branch_or_dept`;
export const GetUserByShift = `${BaseUrl}/authserv/api/v1/get_user_by_shift`;
//
// App Api
export const GetOrgAppsApi = `${BaseUrl}/utilityserv/api/v1/organisation/orgApps`;

/** *****************************************************************
 * Messages endpoint
 ******************************************************************* */

export const GetEmailConfigApi = `${BaseUrl}/messagingserv/api/v1/get_email_config_by_orgId`;
export const SaveEmailConfigApi = `${BaseUrl}/messagingserv/api/v1/emailConfig`;
export const TestConnectionApi = `${BaseUrl}/messagingserv/api/v1/test_email_config`;
export const GetSmsProviderApi = `${BaseUrl}/messagingserv/api/v1/get_all_sms_providers`;
export const GetSmsConfigApi = `${BaseUrl}/messagingserv/api/v1/get_sms_config_by_orgId`;
export const SaveSmsConfigApi = `${BaseUrl}/messagingserv/api/v1/smsConfig`;

// Work order Api
export const SaveVendorApi = `${BaseUrl}/utilityserv/api/v1/add_vendor`;
export const GetListOfVendorsApi = `${BaseUrl}/utilityserv/api/v1/find_all_vendors`;
export const CreateWorkOrderApi = `${BaseUrl}/utilityserv/api/v1/add_workorder`;
export const UpdateWorkOrderApi = `${BaseUrl}/utilityserv/api/v1/update_workorder`;
export const DeleteWorkOrderApi = `${BaseUrl}/utilityserv/api/v1/delete_workorder`;
export const GetListOfWorkOrderApi = `${BaseUrl}/utilityserv/api/v1/find_all_workorders`;

// Account Api
export const GetAllAccountTypeApi = `${BaseUrl}/accountingserv/api/v1/account/get_all_account_types`;
export const GetDetailTypeApi = `${BaseUrl}/accountingserv/api/v1/account/get_detail_types`;
export const CreateChartOfAccountApi = `${BaseUrl}/accountingserv/api/v1/account/add_chart_of_account`;
export const GetAllChartOfAccountApi = `${BaseUrl}/accountingserv/api/v1/account/get_account_by_orgid`;
export const UpdateChartOfAccountApi = `${BaseUrl}/accountingserv/api/v1/account/update_account`;
export const DeleteChartOfAccountApi = `${BaseUrl}/accountingserv/api/v1/account/delete_account`;
export const GetAccountingSetupApi = `${BaseUrl}/accountingserv/api/v1/account/get_settings_by_orgid`;
export const CreateAccountingSetupApi = `${BaseUrl}/accountingserv/api/v1/account/add_account_settings`;
export const GetAccountPeriodApi = `${BaseUrl}/accountingserv/api/v1/account/get_periods_by_orgid`;
export const CreateAccountJournalApi = `${BaseUrl}/accountingserv/api/v1/journal/create_and_add_to_period`;
export const GetParentAccountTypeApi = `${BaseUrl}/accountingserv/api/v1/account/get_parent_types`;
export const CreateNewBankApi = `${BaseUrl}/accountingserv/api/v1/bank/add_bank`;
export const GetAllBankAccount = `${BaseUrl}/accountingserv/api/v1/bank/get_All_bank_account_by_orgid`;
export const GetAllTransferByOrgIdApi = `${BaseUrl}/accountingserv/api/v1/bank/get_All_bank_transfers_by_orgid`;
export const CreateBankTransferApi = `${BaseUrl}/accountingserv/api/v1/bank/transfer`;
export const GetTransferByAccountIdApi = `${BaseUrl}/accountingserv/api/v1/bank/get_bank_transfer_by_id`;
export const GetJounalListApi = `${BaseUrl}/accountingserv/api/v1/journal/get_journals_by_orgid`;
export const GetAllAccountingPeriodApi = `${BaseUrl}/accountingserv/api/v1/account/get_periods_by_orgid`;
export const CreateAccountPeriodApi = `${BaseUrl}/accountingserv/api/v1/account/add_account_period`;
export const UpdateAccountPeriodApi = `${BaseUrl}/accountingserv/api/v1/account/update_account_period_status`;
export const SetAccountPeriodAsActiveApi = `${BaseUrl}/accountingserv/api/v1/account/update_account_active_year`;
export const DeleteBankAccountApi = `${BaseUrl}/accountingserv/api/v1/bank/delete_bank`;
export const UpdateBankAccountApi = `${BaseUrl}/accountingserv/api/v1/bank/update_bank`;
export const SetActiveStatusForBankAccountApi = `${BaseUrl}/accountingserv/api/v1/bank/acivate_or_deactivate_bank`;
export const AddDeprecitionAreaApi = `${BaseUrl}/accountingserv/api/v1/area/add`;
export const GetDeprecitionAreaByIdApi = `${BaseUrl}/accountingserv/api/v1/area/get_depreciation_area_by_id`;
export const GetDeprecitionAreaByOrgIdApi = `${BaseUrl}/accountingserv/api/v1/area/get_depreciation_area_by_orgid`;
export const UpdateDeprecitionAreaApi = `${BaseUrl}/accountingserv/api/v1/area/update`;
export const AddDeprecitionTypeApi = `${BaseUrl}/accountingserv/api/v1/type/add`;
export const GetDeprecitionTypeByIdApi = `${BaseUrl}/accountingserv/api/v1/type/get_depreciation_type_by_id`;
export const GetDeprecitionTypeByOrgIdApi = `${BaseUrl}/accountingserv/api/v1/type/get_depreciation_type_by_orgid`;
export const UpdateDeprecitionTypeApi = `${BaseUrl}/accountingserv/api/v1/type/update`;
export const AddAssetApi = `${BaseUrl}/accountingserv/api/v1/asset/add`;
export const GetAssetByIdApi = `${BaseUrl}/accountingserv/api/v1/asset/get_asset_by_id`;
export const GetAssetByOrgIdApi = `${BaseUrl}/accountingserv/api/v1/asset/get_assets_by_orgid`;
export const AddTaxTypeApi = `${BaseUrl}/accountingserv/api/v1/tax/add`;
export const UpdateTaxTypeApi = `${BaseUrl}/accountingserv/api/v1/tax/update`;
export const GetTaxTypeByIdApi = `${BaseUrl}/accountingserv/api/v1/tax/get_by_id`;
export const GetTaxTypeByOrgIdApi = `${BaseUrl}/accountingserv/api/v1/tax/get_by_orgid`;
export const CreateDisposalApi = `${BaseUrl}/accountingserv/api/v1/disposal/add`;
export const GetDisposalByIdApi = `${BaseUrl}/accountingserv/api/v1/disposal/get_by_id`;
export const GetDisposalByOrgIdApi = `${BaseUrl}/accountingserv/api/v1/disposal/get_by_orgid`;
export const CreateCurrencyApi = `${BaseUrl}/accountingserv/api/v1/currency/add`;
export const UpdateCurrencyApi = `${BaseUrl}/accountingserv/api/v1/currency/update`;
export const GetCurrencyByIdApi = `${BaseUrl}/accountingserv/api/v1/currency/get_by_id`;
export const GetCurrencyByOrgIdApi = `${BaseUrl}/accountingserv/api/v1/currency/get_by_orgid`;
export const CreateAssetTypeApi = `${BaseUrl}/accountingserv/api/v1/assetType/add`;
export const GetAssetTypeByIdApi = `${BaseUrl}/accountingserv/api/v1/assetType/get_asset_type_by_id`;
export const GetAssetTypeByOrgIdApi = `${BaseUrl}/accountingserv/api/v1/assetType/get_asset_type_by_orgid`;
export const UpdateAssetTypeApi = `${BaseUrl}/accountingserv/api/v1/assetType/update`;

/** *****************************************************************
 * Inventory endpoint
 ******************************************************************* */

// Warehouse Apis
export const CreateNewWarehouseApi = `${BaseUrl}/inventoryserv/api/v1/add_warehouse`;
export const UpdateWarehouseApi = `${BaseUrl}/inventoryserv/api/v1/update_warehouse`;
export const GetAllWarehouses = `${BaseUrl}/inventoryserv/api/v1/get_all_warehouses`;

// Item Apis
export const CreateNewItemApi = `${BaseUrl}/inventoryserv/api/v1/upload_item`;
export const GetAllItems = `${BaseUrl}/inventoryserv/api/v1/get_all_items`;
export const GetItemByIdApi = `${BaseUrl}/inventoryserv/api/v1/get_item_by_id`;
export const GetStockLocations = `${BaseUrl}/inventoryserv/api/v1/get_item_status_in_all_warehouses`;

// Transfer Order APIs
export const CreateNewTransferOrdersApi = `${BaseUrl}/inventoryserv/api/v1/add_transfer_orders`;
export const GetAllTransferOrderApi = `${BaseUrl}/inventoryserv/api/v1/get_all_transfer_orders`;
export const GetAllItemsPerWarehouseApi = `${BaseUrl}/inventoryserv/api/v1/get_all_items`;
export const GetTransferOrderByIdApi = `${BaseUrl}/inventoryserv/api/v1/get_by_id`;

// Inventory Adjustment APIs
export const CreateNewInventoryAdjustApi = `${BaseUrl}/inventoryserv/api/v1/do_many_adjustments_per_warehouse`;
export const GetAllInventoryAdjustsApi = `${BaseUrl}/inventoryserv/api/v1/get_all_adjustments`;
export const GetAdjustmentByIdApi = `${BaseUrl}/inventoryserv/api/v1/get_adjustment_by_id`;

/** *****************************************************************
 * CRM endpoint
 ******************************************************************* */

// Contacts Apis
export const CreateNewContactApi = `${BaseUrl}/crmserv/api/v1/add_contact`;
export const UpdateContactApi = `${BaseUrl}/crmserv/api/v1/update_contact`;
export const GetAllContactsApi = `${BaseUrl}/crmserv/api/v1/get_all_individual_contacts_by_orgid`;
export const GetAllCompaniesApi = `${BaseUrl}/crmserv/api/v1/get_all_company_contacts_by_orgid`;

// Contacts Group Apis
export const CreateNewContactGroupApi = `${BaseUrl}/crmserv/api/v1/add_contact_group`;
export const UpdateContactGroupApi = `${BaseUrl}/crmserv/api/v1/update_contact_group`;
export const GetContactGroupByIdApi = `${BaseUrl}/crmserv/api/v1/get_contact_group_by_id`;
export const GetAllContactsGroupApi = `${BaseUrl}/crmserv/api/v1/get_all_contact_groups`;

// Campaigns Group Apis
export const CreateCampaignApi = `${BaseUrl}/crmserv/api/v1/add_campaign`;
export const UpdateCampaignApi = `${BaseUrl}/crmserv/api/v1/update_campaign`;
export const GetCampaignByIdApi = `${BaseUrl}/crmserv/api/v1/get_campaign_by_id/{id}`;
export const GetCampaignsApi = `${BaseUrl}/crmserv/api/v1/get_campaigns_by_orgid`;

// Schedules Group Apis
export const GetSchedulesApi = `${BaseUrl}/crmserv/api/v1/get_all_schedules`;
export const CreateScheduleApi = `${BaseUrl}/crmserv/api/v1/add_schedule`;
export const UpdateScheduleApi = `${BaseUrl}/crmserv/api/v1/update_schedule/{id}`;
export const DeleteScheduleByIdApi = `${BaseUrl}/crmserv/api/v1/delete_schedule_by_id/{id}`;
export const DeleteAllSchedulesApi = `${BaseUrl}/crmserv/api/v1/delete_all_schedules`;
export const RemoveUserFromScheduleApi = `${BaseUrl}/crmserv/api/remove_user_from_schedule/{id}`;
export const RemoveContactFromScheduleApi = `${BaseUrl}/crmserv/api/remove_contact_from_schedule/{id}`;
export const GetScheduleByIdApi = `${BaseUrl}/crmserv/api/v1/get_schedule_by_id/{id}`;
export const GetAllScheduleByStartDateApi = `${BaseUrl}/crmserv/api/v1/get_all_schedules_by_start_date`;
export const GetAllScheduleForTodayApi = `${BaseUrl}/crmserv/api/v1/get_all_schedules_for_today`;

// Crm Activities Apis
export const GetCrmActivitiesApi = `${BaseUrl}/utilityserv/api/v1/find_by_orgid_and_module`;
export const CreateCrmActivityApi = `${BaseUrl}/utilityserv/api/v1/add_log`;

// Crm Social Media Apis
export const GetFacebookTokenApi = `${BaseUrl}/crmserv/api/v1/facebook`;
export const GenerateFacebookAuthoriseUrlApi = `${BaseUrl}/crmserv/api/v1/generateFacebookAuthoriseUrl`;
export const GetUserDataApi = `${BaseUrl}/crmserv/api/v1/get_user_data`;

/** ********************************* LMS MODULE ***********************************
 ********************************************************************************* */
export const GetCategoriesApi = `${BaseUrl}/lmsserv/api/v1/lms/get_category_by_orgid`;
export const AddCategoryApi = `${BaseUrl}/lmsserv/api/v1/lms/add_category`;
export const UpdateCategoryApi = `${BaseUrl}/lmsserv/api/v1/lms/update_category`;
export const DeleteCategoryApi = `${BaseUrl}/lmsserv/api/v1/lms/delete_category`;

export const GetCoursesApi = `${BaseUrl}/lmsserv/api/v1/lms/get_course_by_orgid`;
export const GetCourseByIdApi = `${BaseUrl}/lmsserv/api/v1/get_course_by_id`;
export const AddCourseApi = `${BaseUrl}/lmsserv/api/v1/lms/add_course`;
export const UpdateCourseApi = `${BaseUrl}/lmsserv/api/v1/lms/update_course`;
export const DeleteCourseApi = `${BaseUrl}/lmsserv/api/v1/lms/delete_course`;
export const UploadPreviewApi = `${BaseUrl}/lmsserv/api/v1/lms/upload_preview`;
export const AddCourseVideoApi = `${BaseUrl}/lmsserv/api/v1/lms/add_course_video`;

/** ***********************Reports Api***************************
 ***************************************************************
 ************************************************************** */
export const GetGeneralJournalApi = `${BaseUrl}/accountingserv/api/v1/report/get_general_journal`;
export const GetGeneralLedgerApi = `${BaseUrl}/accountingserv/api/v1/report/get_general_ledger`;
export const GetChatsOfAccountApi = `${BaseUrl}/accountingserv/api/v1/report/get_chart_of_account`;
export const GetTrialBalanceApi = `${BaseUrl}/accountingserv/api/v1/report/get_trial_balance`;
