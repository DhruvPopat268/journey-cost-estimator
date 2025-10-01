import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // Step 1 data
  categoryId: '',
  subcategoryId: '',
  subSubcategoryId: '',
  subcategoryName: '',
  subSubcategoryName: '',
  fromLocation: '',
  toLocation: '',
  fromLocationData: null,
  toLocationData: null,
  selectedCity: '',
  selectedCityName: '',
  carType: '',
  transmissionType: '',
  selectedDate: '',
  selectedTime: '',
  includeInsurance: false,
  
  // Step 2 data
  selectedUsage: '',
  customUsage: '',
  selectedCategory: null,
  totalAmount: [],
  notes: '',
  durationType: 'Day',
  durationValue: '1',
  selectedDates: [],
  
  // UI state
  currentStep: 1,
  vehicleCategories: [],
  priceCategories: [],
  instructions: []
}

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    // Step 1 actions
    setBookingStep1: (state, action) => {
      const {
        categoryId,
        subcategoryId,
        subSubcategoryId,
        subcategoryName,
        subSubcategoryName,
        fromLocation,
        toLocation,
        fromLocationData,
        toLocationData,
        selectedCity,
        selectedCityName,
        carType,
        transmissionType,
        selectedDate,
        selectedTime,
        includeInsurance
      } = action.payload
      
      state.categoryId = categoryId
      state.subcategoryId = subcategoryId
      state.subSubcategoryId = subSubcategoryId
      state.subcategoryName = subcategoryName
      state.subSubcategoryName = subSubcategoryName
      state.fromLocation = fromLocation
      state.toLocation = toLocation
      state.fromLocationData = fromLocationData
      state.toLocationData = toLocationData
      state.selectedCity = selectedCity
      state.selectedCityName = selectedCityName
      state.carType = carType
      state.transmissionType = transmissionType
      state.selectedDate = selectedDate
      state.selectedTime = selectedTime
      state.includeInsurance = includeInsurance
      state.currentStep = 2
    },
    
    // Step 2 actions
    setUsage: (state, action) => {
      state.selectedUsage = action.payload.selectedUsage || ''
      state.customUsage = action.payload.customUsage || ''
    },
    
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload
    },
    
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload
    },
    
    setNotes: (state, action) => {
      state.notes = action.payload
    },
    
    setSelectedDates: (state, action) => {
      state.selectedDates = action.payload
    },
    
    // Data loading actions
    setVehicleCategories: (state, action) => {
      state.vehicleCategories = action.payload
    },
    
    setPriceCategories: (state, action) => {
      state.priceCategories = action.payload
    },
    
    setInstructions: (state, action) => {
      state.instructions = action.payload
    },
    
    // Navigation actions
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload
    },
    
    // Reset booking
    resetBooking: (state) => {
      return initialState
    },
    
    // Purge entire store
    purgeStore: () => {
      return initialState
    },
    
    // Clear Step 2 data only
    clearStep2Data: (state) => {
      state.selectedUsage = ''
      state.customUsage = ''
      state.selectedCategory = null
      state.totalAmount = []
      state.notes = ''
      state.durationType = 'Day'
      state.durationValue = state.subcategoryName?.toLowerCase().includes('monthly') ? '22' : '1'
      state.selectedDates = []
      state.currentStep = 1
    },
    
    // Update individual fields
    updateField: (state, action) => {
      const { field, value } = action.payload
      state[field] = value
    }
  }
})

export const {
  setBookingStep1,
  setUsage,
  setTotalAmount,
  setSelectedCategory,
  setNotes,
  setSelectedDates,
  setVehicleCategories,
  setPriceCategories,
  setInstructions,
  setCurrentStep,
  resetBooking,
  clearStep2Data,
  updateField,
  purgeStore
} = bookingSlice.actions

export default bookingSlice.reducer