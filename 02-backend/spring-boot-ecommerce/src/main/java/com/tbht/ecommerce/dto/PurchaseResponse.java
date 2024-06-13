package com.tbht.ecommerce.dto;

import lombok.Data;
import lombok.NonNull;

@Data
public class PurchaseResponse {

    // lombok @Data will generate constructor for final fields
    private final String orderTrackingNumber;

    // another option is using @NonNull on the field instead of final
//    @NonNull
//    private String orderTrackingNumber;
}
