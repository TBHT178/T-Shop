package com.tbht.ecommerce.service;

import com.tbht.ecommerce.dto.Purchase;
import com.tbht.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
