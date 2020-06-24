/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHR = state => state.hrPage || initialState;

const makeSelectHRPage = () =>
  createSelector(
    selectHR,
    hrState => hrState,
  );

const makeSelectLoading = () =>
  createSelector(
    selectHR,
    hrState => hrState.loading,
  );

const JobOpeningployees = () =>
  createSelector(
    selectHR,
    hrState => hrState.employees,
  );

const makeSelectAttendances = () =>
  createSelector(
    selectHR,
    hrState => hrState.attendances,
  );

const makeSelectDepartments = () =>
  createSelector(
    selectHR,
    hrState => hrState.departments,
  );

const makeSelectDepartmentsByOrgIdApi = () =>
  createSelector(
    selectHR,
    hrState => hrState.departments,
  );

const makeSelectBranches = () =>
  createSelector(
    selectHR,
    hrState => hrState.branches,
  );
const makeSelectPartyTags = () =>
  createSelector(
    selectHR,
    hrState => hrState.party_tags,
  );

const makeSelectRoles = () =>
  createSelector(
    selectHR,
    hrState => hrState.roles,
  );

const makeSelectEmployee = () =>
  createSelector(
    selectHR,
    hrState => hrState.employee,
  );
const makeSelectEmployees = () =>
  createSelector(
    selectHR,
    hrState => hrState.employees,
  );
const makeSelectBranchEmployees = () =>
  createSelector(
    selectHR,
    hrState => hrState.branchEmployees,
  );
const makeSelectDeptEmployees = () =>
  createSelector(
    selectHR,
    hrState => hrState.deptEmployees,
  );
const makeSelectEmployeeTypes = () =>
  createSelector(
    selectHR,
    hrState => hrState.employeeTypes,
  );
const makeSelectSourcesOfHire = () =>
  createSelector(
    selectHR,
    hrState => hrState.sourcesOfHire,
  );
const makeSelectPayRates = () =>
  createSelector(
    selectHR,
    hrState => hrState.payRates,
  );
const makeSelectPayTypes = () =>
  createSelector(
    selectHR,
    hrState => hrState.payTypes,
  );
const makeSelectEnrollmentTypes = () =>
  createSelector(
    selectHR,
    hrState => hrState.enrollmentTypes,
  );
const makeSelectLocations = () =>
  createSelector(
    selectHR,
    hrState => hrState.locations,
  );
const makeSelectJobOpenings = () =>
  createSelector(
    selectHR,
    hrState => hrState.jobOpenings,
  );
const makeSelectJobOpeningDetails = () =>
  createSelector(
    selectHR,
    hrState => hrState.jobOpeningDetails,
  );
const makeSelectAnnouncements = () =>
  createSelector(
    selectHR,
    hrState => hrState.announcements,
  );

const makeSelectPartyGroups = () =>
  createSelector(
    selectHR,
    hrState => hrState.partyGroups,
  );


const makeSelectEmpDialog = () =>
  createSelector(
    selectHR,
    hrState => hrState.empDialog,
  );
const makeSelectDeptDialog = () =>
  createSelector(
    selectHR,
    hrState => hrState.deptDialog,
  );
const makeSelectBranchDialog = () =>
  createSelector(
    selectHR,
    hrState => hrState.branchDialog,
  );
const makeSelectRoleDialog = () =>
  createSelector(
    selectHR,
    hrState => hrState.roleDialog,
  );
const makeSelectPayrollDialog = () =>
  createSelector(
    selectHR,
    hrState => hrState.payrollDialog,
  );
const makeSelectAnnouncementDialog = () =>
  createSelector(
    selectHR,
    hrState => hrState.announcementDialog,
  );
const makeSelectWorkExperienceDialog = () =>
  createSelector(
    selectHR,
    hrState => hrState.workExperienceDialog,
  );
const makeSelectEducationBackgroundDialog = () =>
  createSelector(
    selectHR,
    hrState => hrState.educationBackgroundDialog,
  );
const makeSelectApplicantDialog = () =>
  createSelector(
    selectHR,
    hrState => hrState.applicantDialog,
  );
const makeSelectEmployeeTypeDialog = () =>
  createSelector(
    selectHR,
    hrState => hrState.employeeTypeDialog,
  );
const makeSelectAnnouncementViewDialog = () =>
  createSelector(
    selectHR,
    hrState => hrState.announcementViewDialog,
  );

const makeSelectCreateEmployee = () =>
  createSelector(
    selectHR,
    hrState => hrState.createEmployee,
  );
const makeSelectCreateEmployeeSuccess = () =>
  createSelector(
    selectHR,
    hrState => hrState.getCreateEmployee,
  );

const makeSelectCreateAnnouncement = () =>
  createSelector(
    selectHR,
    hrState => hrState.createAnnouncement,
  );
const makeSelectCreateAnnouncementSuccess = () =>
  createSelector(
    selectHR,
    hrState => hrState.getCreateAnnouncement,
  );
const makeSelectCreateBranch = () =>
  createSelector(
    selectHR,
    hrState => hrState.createBranch,
  );
const makeSelectCreateBranchSuccess = () =>
  createSelector(
    selectHR,
    hrState => hrState.getCreateBranch,
  );

const makeSelectCreateJobOpening = () =>
  createSelector(
    selectHR,
    hrState => hrState.createJobOpening,
  );
const makeSelectCreateJobOpeningSuccess = () =>
  createSelector(
    selectHR,
    hrState => hrState.getCreateJobOpening,
  );
const makeSelectCreateDepartment = () =>
  createSelector(
    selectHR,
    hrState => hrState.createDepartment,
  );
const makeSelectCreateDepartmentSuccess = () =>
  createSelector(
    selectHR,
    hrState => hrState.getCreateDepartment,
  );


export default makeSelectHRPage;
export {
  selectHR,
  makeSelectCreateEmployee,
  makeSelectCreateEmployeeSuccess,
  makeSelectCreateDepartment,
  makeSelectCreateDepartmentSuccess,
  makeSelectCreateBranch,
  makeSelectCreateBranchSuccess,
  makeSelectCreateJobOpening,
  makeSelectCreateJobOpeningSuccess,
  makeSelectLoading,
  makeSelectEmployees,
  makeSelectBranchEmployees,
  makeSelectDeptEmployees,
  makeSelectPartyGroups,
  makeSelectDepartments,
  makeSelectEmployeeTypes,
  makeSelectSourcesOfHire,
  makeSelectPayRates,
  makeSelectPayTypes,
  makeSelectJobOpenings,
  makeSelectAttendances,
  makeSelectEnrollmentTypes,
  makeSelectLocations,
  makeSelectDepartmentsByOrgIdApi,
  makeSelectBranches,
  makeSelectPartyTags,
  makeSelectRoles,
  makeSelectEmployee,
  makeSelectEmpDialog,
  makeSelectDeptDialog,
  makeSelectBranchDialog,
  makeSelectRoleDialog,
  makeSelectPayrollDialog,
  makeSelectAnnouncements,
  makeSelectAnnouncementDialog,
  makeSelectAnnouncementViewDialog,
  makeSelectCreateAnnouncement,
  makeSelectCreateAnnouncementSuccess,
  makeSelectJobOpeningDetails,
  makeSelectWorkExperienceDialog,
  makeSelectEducationBackgroundDialog,
  makeSelectApplicantDialog,
  makeSelectEmployeeTypeDialog,
};
