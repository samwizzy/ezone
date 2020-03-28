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
export const GetAllUsersApi = `${BaseUrl}/authserv/api/v1/users/get_by_orgid`;
export const CreateNewPartyApi = `${BaseUrl}/authserv/api/v1/party/create_and_add_to_group`;
export const CreateNewPartiesApi = `${BaseUrl}/authserv/api/v1/party/create_and_add_to_party`;
export const CreateNewPositionApi = `${BaseUrl}/authserv/api/v1/position`;
export const GetAllPositionsApi = `${BaseUrl}/authserv/api/v1/position/get_position_by_orgId`;
export const AddNewEmployeeToPositionApi = `${BaseUrl}/authserv/api/v1/user/add_to_position`;

/** *****************************************************************
 * Employee endpoint
 ******************************************************************* */

export const CreateNewEmployeeApi = `${BaseUrl}/authserv/api/v1/user`;
export const GetAllEmployeesApi = `${BaseUrl}/authserv/api/v1/users/get_by_orgid`;
export const UpdateUserProfileApi = `${BaseUrl}/authserv/api/v1/user/update_profile`;

/** *****************************************************************
 * Utility endpoint
 ******************************************************************* */

// Utility Apis
// Folder Api
export const InitFolderDirApi = `${BaseUrl}/utilityserv/api/v1/folder/init_directories`;
export const GetAllFoldersAndDocApi = `${BaseUrl}/utilityserv/api/v1/folder/get_all_folders_by_type/{uuid}/{id}/{type}`;
export const CreateAndAddFolderToFolderApi = `${BaseUrl}/utilityserv/api/v1/folder/create_and_add_to_folder`;

// File Api
export const AddDocToFolderApi = `${BaseUrl}/utilityserv/api/v1/document/add_to_folder`;
export const CreateUtilityFileApi = `${BaseUrl}/utilityserv/api/v1/upload_document`;
export const GetUtilityFilesApi = `${BaseUrl}/utilityserv/api/v1/get_document_by_orgid`;
export const GetUtilityFileApi = `${BaseUrl}/utilityserv/api/v1/get_document_by_id`;
export const DeleteUtilityFileApi = `${BaseUrl}/utilityserv/api/v1/document/delete_document`;
export const RestoreDocumentApi = `${BaseUrl}/utilityserv/api/v1/document/restore_document/{id}/{type}`;

export const GetFavoriteDocumentApi = `${BaseUrl}/utilityserv/api/v1/get_favourite_by_uuid`;
export const FavoriteDocumentApi = `${BaseUrl}/utilityserv/api/v1/favourite_document`;
export const UnfavoriteDocumentApi = `${BaseUrl}/utilityserv/api/v1/unfavourite_document`;
export const ShareDocumentApi = `${BaseUrl}/utilityserv/api/v1/document/share_document`;
export const GetShareDocumentApi = `${BaseUrl}/utilityserv/api/v1/share_document/get_shared_document_by_uuid`;
export const GenerateLinkAndSendEmailApi = `${BaseUrl}/utilityserv/api/v1/share_document/send_email_to_file_owner/{userId}/{sharedId}`;

// Task Api
export const GetUtilityTasksApi = `${BaseUrl}/utilityserv/api/v1/get_tasks_by_orgid`;
export const GetUtilityTaskApi = `${BaseUrl}/utilityserv/api/v1/task`;
export const UpdateUtilityTaskApi = `${BaseUrl}/utilityserv/api/v1/task/update_task`;
export const CreateUtilityTasksApi = `${BaseUrl}/utilityserv/api/v1/task`;
export const GetUtilityTasksByStatusApi = `${BaseUrl}/utilityserv/api/v1/get_by_orgid_and_status`;
export const AddTaskAttachmentApi = `${BaseUrl}/utilityserv/api/v1/task/add_attachments`;
export const RemoveTaskAttachmentApi = `${BaseUrl}/utilityserv/api/v1/task/remove_attachments`;
export const TaskCommentApi = `${BaseUrl}/utilityserv/api/v1/comment/add_comment`;

// Chat Api
export const GetUserChatApi = `${BaseUrl}/utilityserv/api/v1/chat/get_user_chat`;
export const GetUserChatDataApi = `${BaseUrl}/utilityserv/api/v1/message/get_messages_for_chat`;
export const SendMessageApi = `${BaseUrl}/utilityserv/api/v1/message/send_message`;

// User
export const GetEmployeesApi = `${BaseUrl}/authserv/api/v1/users`;
export const GetUserByUUIDApi = `${BaseUrl}/authserv/api/v1/users/get_by_uuid`;

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

// Work order Api
export const SaveVendorApi = `${BaseUrl}/utilityserv/api/v1/add_vendor`;
export const GetListOfVendorsApi = `${BaseUrl}/utilityserv/api/v1/find_all_vendors`;
export const CreateWorkOrderApi = `${BaseUrl}/utilityserv/api/v1/add_workorder`;
export const GetListOfWorkOrderApi = `${BaseUrl}/utilityserv/api/v1/find_all_workorders`;


