/*
 *
 * LMS Course Category actions
 *
 */

import * as Constants from './constants';

export function openNewCategoryDialog() {
  return {
    type: Constants.OPEN_NEW_CATEGORY_DIALOG,
  }
}

export function closeNewCategoryDialog() {
  return {
    type: Constants.CLOSE_NEW_CATEGORY_DIALOG,
  }
}

export function openEditCategoryDialog(data) {
  return {
    type: Constants.OPEN_EDIT_CATEGORY_DIALOG,
    payload: data,
  }
}

export function closeEditCategoryDialog() {
  return {
    type: Constants.CLOSE_EDIT_CATEGORY_DIALOG,
  }
}

export function createCategory(data) {
  return {
    type: Constants.CREATE_CATEGORY,
    payload: data,
  }
}

export function createCategorySuccess(data) {
  return {
    type: Constants.CREATE_CATEGORY_SUCCESS,
    payload: data,
  }
}

export function createCategoryError(data) {
  return {
    type: Constants.CREATE_CATEGORY_ERROR,
    payload: data,
  }
}

export function updateCategory(data) {
  return {
    type: Constants.UPDATE_CATEGORY,
    payload: data,
  }
}

export function updateCategorySuccess(data) {
  return {
    type: Constants.UPDATE_CATEGORY_SUCCESS,
    payload: data,
  }
}

export function updateCategoryError(data) {
  return {
    type: Constants.UPDATE_CATEGORY_ERROR,
    payload: data,
  }
}

export function deleteCategory(data) {
  return {
    type: Constants.DELETE_CATEGORY,
    payload: data,
  }
}

export function deleteCategorySuccess(data) {
  return {
    type: Constants.DELETE_CATEGORY_SUCCESS,
    payload: data,
  }
}

export function deleteCategoryError(data) {
  return {
    type: Constants.DELETE_CATEGORY_ERROR,
    payload: data,
  }
}

export function getCategories() {
  return {
    type: Constants.GET_CATEGORIES,
  }
}

export function getCategoriesSuccess(data) {
  return {
    type: Constants.GET_CATEGORIES_SUCCESS,
    payload: data,
  }
}

export function getCategoriesError(data) {
  return {
    type: Constants.GET_CATEGORIES_ERROR,
    payload: data,
  }
}
