# Hospital-Api

### Hosted At : https://hospital-api-harsh.herokuapp.com/


# Task
# Theme:
### An API for the doctors of a Hospital which has been allocated by the govt for testing and quarantine + well being of COVID-19 patients
### There can be 2 types of Users
  ## 1. Doctors & Patients
  ## 2.Doctors can log in
### Each time a patient visits, the doctor will follow 2 steps
### Register the patient in the app (using phone number, if the patient already exists, just return the patient info in the API)
### After the checkup, create a Report
### Patient Report will have the following fields:
## 1.)Created by doctor 
## 2.)Status (You can use enums if you want to): Can be either of: [Negative, Travelled-Quarantine, Symptoms-Quarantine, PositiveAdmit] 
## 3.) Date
# Required Routes
## 1. /doctors/register > with username and password return the status with msg and JWT Tokken
## 2. /doctors/login > returns the JWT to be used
## 3. /patients/register > needs JWT tokken to register teh Patient
## 4. /patients/:id/create_report > d used here should be mobile no. of patients Doctor entered at registrations time
## 5. /patients/:id/all_reports > List all the reports of a patient oldest to latest
## 6. /reports/:status > List all the reports of all the patients filtered by a specific status
