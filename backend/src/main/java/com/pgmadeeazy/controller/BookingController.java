package com.pgmadeeazy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pgmadeeazy.model.Booking;
import com.pgmadeeazy.model.Payment;
import com.pgmadeeazy.service.BookingService;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        return ResponseEntity.ok(bookingService.createBooking(booking));
    }

    @GetMapping("/seeker/{seekerId}")
    public ResponseEntity<List<Booking>> getSeekerBookings(@PathVariable String seekerId) {
        return ResponseEntity.ok(bookingService.getSeekerBookings(seekerId));
    }

    @GetMapping("/property/{propertyId}")
    public ResponseEntity<List<Booking>> getPropertyBookings(@PathVariable String propertyId) {
        return ResponseEntity.ok(bookingService.getPropertyBookings(propertyId));
    }

    @GetMapping("/{bookingId}")
    public ResponseEntity<Booking> getBookingById(@PathVariable String bookingId) {
        return ResponseEntity.ok(bookingService.getBookingById(bookingId));
    }

    @PutMapping("/{bookingId}/status")
    public ResponseEntity<Booking> updateBookingStatus(
            @PathVariable String bookingId,
            @RequestParam Booking.BookingStatus status) {
        return ResponseEntity.ok(bookingService.updateBookingStatus(bookingId, status));
    }

    @PutMapping("/{bookingId}/payment-status")
    public ResponseEntity<Booking> updatePaymentStatus(
            @PathVariable String bookingId,
            @RequestParam Booking.PaymentStatus status) {
        return ResponseEntity.ok(bookingService.updatePaymentStatus(bookingId, status));
    }

    @PostMapping("/payments")
    public ResponseEntity<Payment> createPayment(@RequestBody Payment payment) {
        return ResponseEntity.ok(bookingService.createPayment(payment));
    }

    @GetMapping("/payments/booking/{bookingId}")
    public ResponseEntity<List<Payment>> getBookingPayments(@PathVariable String bookingId) {
        return ResponseEntity.ok(bookingService.getBookingPayments(bookingId));
    }

    @GetMapping("/payments/seeker/{seekerId}")
    public ResponseEntity<List<Payment>> getSeekerPayments(@PathVariable String seekerId) {
        return ResponseEntity.ok(bookingService.getSeekerPayments(seekerId));
    }

    @GetMapping("/provider/{providerId}")
    public ResponseEntity<List<Booking>> getProviderBookings(@PathVariable String providerId) {
        return ResponseEntity.ok(bookingService.getProviderBookings(providerId));
    }

    @PutMapping("/payments/{paymentId}/status")
    public ResponseEntity<Payment> updatePaymentStatus(
            @PathVariable String paymentId,
            @RequestParam Payment.PaymentStatus status) {
        return ResponseEntity.ok(bookingService.updatePaymentStatus(paymentId, status));
    }
}