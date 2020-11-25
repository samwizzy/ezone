import * as Constants from './constants';

export function getPayrollSetup() {
  return {
    type: Constants.GET_PAYROLL_SETUP,
  }
}

export function getPayrollSetupSuccess(data) {
  return {
    type: Constants.GET_PAYROLL_SETUP_SUCCESS,
    payload: data,
  }
}

export function getPayrollSetupError(data) {
  return {
    type: Constants.GET_PAYROLL_SETUP_ERROR,
    payload: data,
  }
}

// ALLOWANCE
export function openNewAllowanceDialog() {
  return {
    type: Constants.OPEN_NEW_ALLOWANCE_DIALOG,
  };
}

export function closeNewAllowanceDialog() {
  return {
    type: Constants.CLOSE_NEW_ALLOWANCE_DIALOG,
  };
}

// Edit Allowance dialog
export function openEditAllowanceDialog(data) {
  return {
    type: Constants.OPEN_EDIT_ALLOWANCE_DIALOG,
    payload: data,
  };
}

export function closeEditAllowanceDialog() {
  return {
    type: Constants.CLOSE_EDIT_ALLOWANCE_DIALOG,
  };
}

// Create new allowance
export function createAllowance(data) {
  return {
    type: Constants.CREATE_ALLOWANCE,
    payload: data,
  };
}

export function createAllowanceSuccess(data) {
  return {
    type: Constants.CREATE_ALLOWANCE_SUCCESS,
    payload: data,
  };
}

export function createAllowanceError(data) {
  return {
    type: Constants.CREATE_ALLOWANCE_ERROR,
    payload: data,
  };
}

export function getAllowances() {
  return {
    type: Constants.GET_ALLOWANCES,
  };
}

export function getAllowancesSuccess(data) {
  return {
    type: Constants.GET_ALLOWANCES_SUCCESS,
    payload: data,
  };
}

export function getAllowancesError(data) {
  return {
    type: Constants.GET_ALLOWANCES_ERROR,
    payload: data,
  }
}

export function getAllowanceById(data) {
  return {
    type: Constants.GET_ALLOWANCE_BY_ID,
    payload: { id: data }
  }
}

export function getAllowanceByIdSuccess(data) {
  return {
    type: Constants.GET_ALLOWANCE_BY_ID_SUCCESS,
    payload: data,
  }
}

export function getAllowanceByIdError(data) {
  return {
    type: Constants.GET_ALLOWANCE_BY_ID_ERROR,
    payload: data,
  }
}

// BENEFIT
export function openNewBenefitDialog() {
  return {
    type: Constants.OPEN_NEW_BENEFIT_DIALOG,
  };
}

export function closeNewBenefitDialog() {
  return {
    type: Constants.CLOSE_NEW_BENEFIT_DIALOG,
  };
}

// Edit Benefit dialog
export function openEditBenefitDialog(data) {
  return {
    type: Constants.OPEN_EDIT_BENEFIT_DIALOG,
    payload: data,
  };
}

export function closeEditBenefitDialog() {
  return {
    type: Constants.CLOSE_EDIT_BENEFIT_DIALOG,
  };
}

// Create new Benefit
export function createBenefit(data) {
  return {
    type: Constants.CREATE_BENEFIT,
    payload: data,
  };
}

export function createBenefitSuccess(data) {
  return {
    type: Constants.CREATE_BENEFIT_SUCCESS,
    payload: data,
  };
}

export function createBenefitError(data) {
  return {
    type: Constants.CREATE_BENEFIT_ERROR,
    payload: data,
  };
}

export function getBenefits() {
  return {
    type: Constants.GET_BENEFITS,
  };
}

export function getBenefitsSuccess(data) {
  return {
    type: Constants.GET_BENEFITS_SUCCESS,
    payload: data,
  };
}

export function getBenefitsError(data) {
  return {
    type: Constants.GET_BENEFITS_ERROR,
    payload: data,
  }
}

export function getBenefitById(data) {
  return {
    type: Constants.GET_BENEFIT_BY_ID,
    payload: { id: data }
  }
}

export function getBenefitByIdSuccess(data) {
  return {
    type: Constants.GET_BENEFIT_BY_ID_SUCCESS,
    payload: data,
  }
}

export function getBenefitByIdError(data) {
  return {
    type: Constants.GET_BENEFIT_BY_ID_ERROR,
    payload: data,
  }
}

// EARNING
export function openNewEarningDialog() {
  return {
    type: Constants.OPEN_NEW_EARNING_DIALOG,
  };
}

export function closeNewEarningDialog() {
  return {
    type: Constants.CLOSE_NEW_EARNING_DIALOG,
  };
}

// Edit earning dialog
export function openEditEarningDialog(data) {
  return {
    type: Constants.OPEN_EDIT_EARNING_DIALOG,
    payload: data,
  };
}

export function closeEditEarningDialog() {
  return {
    type: Constants.CLOSE_EDIT_EARNING_DIALOG,
  };
}

// Create new earning
export function createEarning(data) {
  return {
    type: Constants.CREATE_EARNING,
    payload: data,
  };
}

export function createEarningSuccess(data) {
  return {
    type: Constants.CREATE_EARNING_SUCCESS,
    payload: data,
  };
}

export function createEarningError(data) {
  return {
    type: Constants.CREATE_EARNING_ERROR,
    payload: data,
  };
}

export function getEarnings() {
  return {
    type: Constants.GET_EARNINGS,
  };
}

export function getEarningsSuccess(data) {
  return {
    type: Constants.GET_EARNINGS_SUCCESS,
    payload: data,
  };
}

export function getEarningsError(data) {
  return {
    type: Constants.GET_EARNINGS_ERROR,
    payload: data,
  }
}

export function getEarningById(data) {
  return {
    type: Constants.GET_EARNING_BY_ID,
    payload: { id: data }
  }
}

export function getEarningByIdSuccess(data) {
  return {
    type: Constants.GET_EARNING_BY_ID_SUCCESS,
    payload: data,
  }
}

export function getEarningByIdError(data) {
  return {
    type: Constants.GET_EARNING_BY_ID_ERROR,
    payload: data,
  }
}

// DEDUCTION
export function openNewDeductionDialog() {
  return {
    type: Constants.OPEN_NEW_DEDUCTION_DIALOG,
  };
}

export function closeNewDeductionDialog() {
  return {
    type: Constants.CLOSE_NEW_DEDUCTION_DIALOG,
  };
}

// Edit deduction dialog
export function openEditDeductionDialog(data) {
  return {
    type: Constants.OPEN_EDIT_DEDUCTION_DIALOG,
    payload: data,
  };
}

export function closeEditDeductionDialog() {
  return {
    type: Constants.CLOSE_EDIT_DEDUCTION_DIALOG,
  };
}

// Create new deduction
export function createDeduction(data) {
  return {
    type: Constants.CREATE_DEDUCTION,
    payload: data,
  };
}

export function createDeductionSuccess(data) {
  return {
    type: Constants.CREATE_DEDUCTION_SUCCESS,
    payload: data,
  };
}

export function createDeductionError(data) {
  return {
    type: Constants.CREATE_DEDUCTION_ERROR,
    payload: data,
  };
}

export function getDeductions() {
  return {
    type: Constants.GET_DEDUCTIONS,
  };
}

export function getDeductionsSuccess(data) {
  return {
    type: Constants.GET_DEDUCTIONS_SUCCESS,
    payload: data,
  };
}

export function getDeductionsError(data) {
  return {
    type: Constants.GET_DEDUCTIONS_ERROR,
    payload: data,
  }
}

export function getDeductionById(data) {
  return {
    type: Constants.GET_DEDUCTION_BY_ID,
    payload: { id: data }
  }
}

export function getDeductionByIdSuccess(data) {
  return {
    type: Constants.GET_DEDUCTION_BY_ID_SUCCESS,
    payload: data,
  }
}

export function getDeductionByIdError(data) {
  return {
    type: Constants.GET_DEDUCTION_BY_ID_ERROR,
    payload: data,
  }
}
