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

#Use PostMan for all Post requests

# Required Routes
## 1. /doctors/register > with username and password return the status with message "Successfully Registrated "
## 2. /loggedUser > it will return the logged user details
## 3. /changePassword > it will allow user to change password with existed Email Id
## 4. /doctors/login > returns the JWT to be used
## 5. /patients/register > needs JWT tokken to register teh Patient
## 6. /patients/:id/create_report > it will allow Doctor to create report of Patient with use of mobile no. of patients entered at registrations time
## 7. /patients/:id/all_reports > List all the reports of a patient oldest to latest
## 8. /reports/:status > List all the reports of all the patients filtered by a specific status
