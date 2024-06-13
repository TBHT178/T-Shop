package com.tbht.ecommerce.dto;

import com.tbht.ecommerce.entity.Address;
import com.tbht.ecommerce.entity.Customer;
import com.tbht.ecommerce.entity.Order;
import com.tbht.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
