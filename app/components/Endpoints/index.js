import { BaseUrl } from '../BaseUrl';

/** *****************************************************************
 * Authentication endpoint
 ******************************************************************* */

// Authentication Apis
export const RegistrationUrl = `${BaseUrl}/authserv/api/v1/register`;
export const LoginUrl = `${BaseUrl}/authserv/oauth/token`;
export const UserProfileUrl = `${BaseUrl}/authserv/api/v1/users/profile`;

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
export const GetUserByUUIDApi = `${BaseUrl}/authserv/api/v1/users/get_by_uuid`;
export const UpdateUserProfileApi = `${BaseUrl}/authserv/api/v1/user/update_profile`;

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
export const CreateEmployee = `${BaseUrl}/authserv/api/v1/user`;
export const GetEmployeesByOrgIdApi = `${BaseUrl}/authserv/api/v1/users/get_by_orgid`;

export const GetEnrollmentTypes = `${BaseUrl}/authserv/api/v1/generic_entities/for_organinisation`;
export const GetLocations = `${BaseUrl}/authserv/api/v1/generic_entities/for_organinisation`;

//Job openings
export const GetJobOpenings = `${BaseUrl}/authserv/api/v1/job_openings/for_organinisation`;
export const CreateJobOpening = `${BaseUrl}/authserv/api/v1/job_opening`;
export const GetJobOpeningDetails = `${BaseUrl}/authserv/api/v1/job_openings/get_by_id`;

//Roles
export const GetRoles = `${BaseUrl}/authserv/api/v1/generic_entities/for_organinisation`;
export const CreateRole = `${BaseUrl}/authserv/api/v1/generic_entity/add`;


// Department
export const DepartmentApi = `${BaseUrl}/hrserv/api/v1/department`;
export const DepartmentsApi = `${BaseUrl}/hrserv/api/v1/departments`;
export const GetDepartmentsByIdApi = `${BaseUrl}/hrserv/api/v1/departments/{id}`;
export const GetDepartmentsByParentIdApi = `${BaseUrl}/hrserv/api/v1/departments/by_parent/{parentId}`;
//export const GetDepartmentsByOrgIdApi = `${BaseUrl}/authserv/api/v1/organisation/parties`;
export const GetPartyGroups = `${BaseUrl}/authserv/api/v1/organisation/partygroups`;
export const GetDepartmentsByOrgIdApi = `${BaseUrl}/authserv/api/v1/organisation_and_tag/parties`;
export const GetBranches = `${BaseUrl}/authserv/api/v1/organisation_and_tag/parties`;
export const CreateDepartment = `${BaseUrl}/authserv/api/v1/party/create_and_add_to_group`;
export const CreateBranch = `${BaseUrl}/authserv/api/v1/party/create_and_add_to_group`;

export const CreateAnnouncement = `${BaseUrl}/authserv/api/v1/announcement`;

export const GetAnnouncements = `${BaseUrl}/authserv/api/v1/announcements/for_organinisation`;

// HR:Attendance API
export const GetAttendances = `${BaseUrl}/authserv/api/v1/find_attendance_by_orgid`;
export const CreateAttendanceApi = `${BaseUrl}/authserv/api/v1/add_attendance`;
export const GetDays = `${BaseUrl}/authserv/api/v1/all_days`
export const CreateShift = `${BaseUrl}/authserv/api/v1/add_shift`
export const GetShifts = `${BaseUrl}/authserv/api/v1/find_shift_by_orgid`;
export const AssignShift = `${BaseUrl}/authserv/api/v1/assign_shift_to_users`
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

// Crm Activities Apis
export const GetCrmActivitiesApi = `${BaseUrl}/utilityserv/api/v1/find_by_orgid_and_module`;
