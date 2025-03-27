package com.pgmadeeazy.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import jakarta.validation.constraints.*;
import java.util.List;

@Document(collection = "providers")
public class Provider {
    @Id
    private String id;

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^\\d{10}$", message = "Phone number must be 10 digits")
    private String phone;

    @NotBlank(message = "Date of birth is required")
    private String dateOfBirth;

    @NotBlank(message = "Gender is required")
    private String gender;

    @NotBlank(message = "Current city is required")
    private String currentCity;

    @NotBlank(message = "Government ID type is required")
    private String govtIdType;

    @NotBlank(message = "Government ID number is required")
    private String govtIdNumber;

    @NotBlank(message = "Emergency contact name is required")
    private String emergencyContactName;

    @NotBlank(message = "Emergency contact number is required")
    @Pattern(regexp = "^\\d{10}$", message = "Emergency contact number must be 10 digits")
    private String emergencyContactNumber;

    @NotNull(message = "Terms agreement is required")
    private Boolean termsAgreed;

    @NotBlank(message = "Role is required")
    private String role = "provider"; // Default role for providers

    @NotBlank(message = "PG name is required")
    private String pgName;

    @NotBlank(message = "PG address is required")
    private String pgAddress;

    @NotNull(message = "Number of available rooms is required")
    private Integer availableRooms;

    @NotNull(message = "Has single rooms is required")
    private Boolean hasSingleRooms;

    @NotNull(message = "Has shared rooms is required")
    private Boolean hasSharedRooms;

    @NotNull(message = "Minimum rent is required")
    private Integer rentMin;

    @NotNull(message = "Maximum rent is required")
    private Integer rentMax;

    @NotBlank(message = "Preferred tenants is required")
    private String preferredTenants;

    @NotNull(message = "Security deposit amount is required")
    private Integer depositAmount;

    @NotNull(message = "Notice period is required")
    private String noticePeriod;

    @NotNull(message = "House rules are required")
    private List<String> houseRules;

    private String additionalRules;

    @NotBlank(message = "User type is required")
    private String userType;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getCurrentCity() {
        return currentCity;
    }

    public void setCurrentCity(String currentCity) {
        this.currentCity = currentCity;
    }

    public String getGovtIdType() {
        return govtIdType;
    }

    public void setGovtIdType(String govtIdType) {
        this.govtIdType = govtIdType;
    }

    public String getGovtIdNumber() {
        return govtIdNumber;
    }

    public void setGovtIdNumber(String govtIdNumber) {
        this.govtIdNumber = govtIdNumber;
    }

    public String getEmergencyContactName() {
        return emergencyContactName;
    }

    public void setEmergencyContactName(String emergencyContactName) {
        this.emergencyContactName = emergencyContactName;
    }

    public String getEmergencyContactNumber() {
        return emergencyContactNumber;
    }

    public void setEmergencyContactNumber(String emergencyContactNumber) {
        this.emergencyContactNumber = emergencyContactNumber;
    }

    public Boolean getTermsAgreed() {
        return termsAgreed;
    }

    public void setTermsAgreed(Boolean termsAgreed) {
        this.termsAgreed = termsAgreed;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getPgName() {
        return pgName;
    }

    public void setPgName(String pgName) {
        this.pgName = pgName;
    }

    public String getPgAddress() {
        return pgAddress;
    }

    public void setPgAddress(String pgAddress) {
        this.pgAddress = pgAddress;
    }

    public Integer getAvailableRooms() {
        return availableRooms;
    }

    public void setAvailableRooms(Integer availableRooms) {
        this.availableRooms = availableRooms;
    }

    public Boolean getHasSingleRooms() {
        return hasSingleRooms;
    }

    public void setHasSingleRooms(Boolean hasSingleRooms) {
        this.hasSingleRooms = hasSingleRooms;
    }

    public Boolean getHasSharedRooms() {
        return hasSharedRooms;
    }

    public void setHasSharedRooms(Boolean hasSharedRooms) {
        this.hasSharedRooms = hasSharedRooms;
    }

    public Integer getRentMin() {
        return rentMin;
    }

    public void setRentMin(Integer rentMin) {
        this.rentMin = rentMin;
    }

    public Integer getRentMax() {
        return rentMax;
    }

    public void setRentMax(Integer rentMax) {
        this.rentMax = rentMax;
    }

    public String getPreferredTenants() {
        return preferredTenants;
    }

    public void setPreferredTenants(String preferredTenants) {
        this.preferredTenants = preferredTenants;
    }

    public Integer getDepositAmount() {
        return depositAmount;
    }

    public void setDepositAmount(Integer depositAmount) {
        this.depositAmount = depositAmount;
    }

    public String getNoticePeriod() {
        return noticePeriod;
    }

    public void setNoticePeriod(String noticePeriod) {
        this.noticePeriod = noticePeriod;
    }

    public List<String> getHouseRules() {
        return houseRules;
    }

    public void setHouseRules(List<String> houseRules) {
        this.houseRules = houseRules;
    }

    public String getAdditionalRules() {
        return additionalRules;
    }

    public void setAdditionalRules(String additionalRules) {
        this.additionalRules = additionalRules;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public void save() {
        // Logic to save Provider data to the database
    }
}