package com.pgmadeeazy.repository;

import com.pgmadeeazy.model.Property;
import com.pgmadeeazy.model.ApprovalStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends MongoRepository<Property, String> {
    List<Property> findByApprovalStatus(ApprovalStatus status);
    List<Property> findByCityAndAreaAndBuildingTypeAndRentBetween(String city, String area, String buildingType, Double minRent, Double maxRent);
    List<Property> findByCityAndAreaAndRentBetweenAndRoomsBetweenAndBuildingTypeAndCategory(String city, String area, Double minRent, Double maxRent, Integer minRooms, Integer maxRooms, String buildingType, String category);
    List<Property> findByOwnerName(String ownerName);
}
