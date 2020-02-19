// Authentication Apis
export const RegistrationUrl = '/authserv/api/v1/register';
export const LoginUrl = '/authserv/oauth/token';
export const UserProfileUrl = '/authserv/api/v1/users/profile';

// Company structure Apis
export const CompanyInfoUrl = '/authserv/api/v1/organisation';
export const UpdateCompanyInfoUrl = '/authserv/api/v1/update_organization';
export const GetPartyGroup = '/authserv/api/v1/organisation/partygroups';
export const CreateNewPartyGroup = '/authserv/api/v1/partygroup';
export const GetAllUsersApi = '/authserv/api/v1/users';
export const CreateNewPartyApi =
  '/authserv/api/v1/party/create_and_add_to_group';
export const CreateNewEmployeeApi = '/authserv/api/v1/user';

// Utility Apis -> File 
export const GetUtilityFilesApi = '/utilityserv/api/v1/get_document_by_orgid';
export const CreateUtilityFilesApi = '/utilityserv/api/v1/share_document';
// Task Api
export const GetUtilityTasksApi = '/utilityserv/api/v1/get_tasks_by_orgid';
export const CreateUtilityTasksApi = '/utilityserv/api/v1/task';
// Chat Api
export const GetUtilityChatsApi = '/utilityserv/api/v1/organisation/chats';
// App Api
export const GetOrgAppsApi = '/utilityserv/api/v1/organisation/orgApps';
