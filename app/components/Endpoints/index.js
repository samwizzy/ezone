// Authentication Apis
export const RegistrationUrl = '/authserv/api/v1/register';
export const LoginUrl = '/authserv/oauth/token';
export const UserProfileUrl = '/authserv/api/v1/users/profile';

/** *****************************************************************
 * Organization and Company structure endpoint
 ******************************************************************* */

// Company structure Apis
export const CompanyInfoUrl = '/authserv/api/v1/organisation';
export const UpdateCompanyInfoUrl = '/authserv/api/v1/update_organization';
export const GetPartyGroup = '/authserv/api/v1/organisation/partygroups';
export const CreateNewPartyGroup = '/authserv/api/v1/partygroup';
export const GetAllUsersApi = '/authserv/api/v1/users/get_by_orgid';
export const CreateNewPartyApi =
  '/authserv/api/v1/party/create_and_add_to_group';
export const CreateNewPartiesApi =
  '/authserv/api/v1/party/create_and_add_to_party';
export const CreateNewPositionApi = '/authserv/api/v1/position';
export const GetAllPositionsApi =
  '/authserv/api/v1/position/get_position_by_orgId';
export const AddNewEmployeeToPositionApi =
  '/authserv/api/v1/user/add_to_position';
export const CreateNewEmployeeApi = '/authserv/api/v1/user';
export const GetAllEmployeesApi = '/authserv/api/v1/users/get_by_orgid';

// Utility Apis
// File Api
export const CreateUtilityFileApi = '/utilityserv/api/v1/upload_document';
export const GetUtilityFilesApi = '/utilityserv/api/v1/get_document_by_orgid';
export const ShareUtilityFilesApi = '/utilityserv/api/v1/share_document';

// Task Api
export const GetUtilityTasksApi = '/utilityserv/api/v1/get_tasks_by_orgid';
export const CreateUtilityTasksApi = '/utilityserv/api/v1/task';

// Chat Api
export const GetUsersChatApi = '/utilityserv/api/v1/chat/get_user_chat';

// User 
export const GetEmployeesApi = '/authserv/api/v1/users';

// App Api
export const GetOrgAppsApi = '/utilityserv/api/v1/organisation/orgApps';
export const GetEmailConfigApi = '/messagingserv/api/v1/get_email_config_by_orgId';
export const SaveEmailConfigApi = '/messagingserv/api/v1/emailConfig';
export const TestConnectionApi = '/messagingserv/api/v1/test_email_config';
export const GetSmsProviderApi = '/messagingserv/api/v1/get_all_sms_providers';
export const GetSmsConfigApi = '/messagingserv/api/v1/get_sms_config_by_orgId';

// Work order Api
export const SaveVendorApi = '/utilityserv/api/v1/add_vendor';
export const GetListOfVendorsApi = '/utilityserv/api/v1/find_all_vendors';