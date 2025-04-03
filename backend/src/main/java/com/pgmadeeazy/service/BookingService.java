package com.pgmadeeazy.service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pgmadeeazy.model.Booking;
import com.pgmadeeazy.model.Payment;
import com.pgmadeeazy.model.Property;
import com.pgmadeeazy.model.Seeker;
import com.pgmadeeazy.repository.BookingRepository;
import com.pgmadeeazy.repository.PaymentRepository;
import com.pgmadeeazy.repository.PropertyRepository;
import com.pgmadeeazy.repository.SeekerRepository;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private SeekerRepository seekerRepository;

    public Booking createBooking(Booking booking) {
        booking.setCreatedAt(new Date());
        booking.setUpdatedAt(new Date());
        booking.setStatus(Booking.BookingStatus.PENDING);
        booking.setPaymentStatus(Booking.PaymentStatus.PENDING);
        return bookingRepository.save(booking);
    }

    public Booking updateBookingStatus(String bookingId, Booking.BookingStatus status) {
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setStatus(status);
        
        // Update payment status based on booking status and payment method
        if (status == Booking.BookingStatus.CONFIRMED) {
            if (booking.getPaymentMethod() == Booking.PaymentMethod.PAYPAL) {
                booking.setPaymentStatus(Booking.PaymentStatus.PAID);
            } else if (booking.getPaymentMethod() == Booking.PaymentMethod.CASH) {
                booking.setPaymentStatus(Booking.PaymentStatus.PENDING);
            }
        }
        
        booking.setUpdatedAt(new Date());
        return bookingRepository.save(booking);
    }

    public Booking updatePaymentStatus(String bookingId, Booking.PaymentStatus status) {
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new RuntimeException("Booking not found"));
        booking.setPaymentStatus(status);
        booking.setUpdatedAt(new Date());
        return bookingRepository.save(booking);
    }

    public List<Booking> getSeekerBookings(String seekerId) {
        List<Booking> bookings = bookingRepository.findBySeekerId(seekerId);
        return bookings.stream()
            .map(booking -> {
                // Set property details
                Property property = propertyRepository.findById(booking.getPropertyId())
                    .orElse(null);
                if (property != null) {
                    booking.setProperty(property);
                }
                
                // Set seeker details
                Seeker seeker = seekerRepository.findById(booking.getSeekerId())
                    .orElseThrow(() -> new RuntimeException("Seeker not found for ID: " + booking.getSeekerId()));
                booking.setSeeker(seeker);
                
                return booking;
            })
            .collect(Collectors.toList());
    }

    public List<Booking> getPropertyBookings(String propertyId) {
        return bookingRepository.findByPropertyId(propertyId);
    }

    public Booking getBookingById(String bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new RuntimeException("Booking not found"));
        
        // Set property details
        Property property = propertyRepository.findById(booking.getPropertyId())
            .orElse(null);
        if (property != null) {
            booking.setProperty(property);
        }
        
        // Set seeker details
        Seeker seeker = seekerRepository.findById(booking.getSeekerId())
            .orElse(null);
        if (seeker != null) {
            booking.setSeeker(seeker);
        }
        
        return booking;
    }

    public Payment createPayment(Payment payment) {
        payment.setCreatedAt(new Date());
        payment.setUpdatedAt(new Date());
        payment.setStatus(Payment.PaymentStatus.PENDING);
        return paymentRepository.save(payment);
    }

    public Payment updatePaymentStatus(String paymentId, Payment.PaymentStatus status) {
        Payment payment = paymentRepository.findById(paymentId)
            .orElseThrow(() -> new RuntimeException("Payment not found"));
        payment.setStatus(status);
        payment.setUpdatedAt(new Date());
        return paymentRepository.save(payment);
    }

    public List<Payment> getBookingPayments(String bookingId) {
        return paymentRepository.findByBookingId(bookingId);
    }

    public List<Payment> getSeekerPayments(String seekerId) {
        return paymentRepository.findByPayerId(seekerId);
    }

    public List<Booking> getProviderBookings(String providerId) {
        // Get all properties owned by the provider
        List<Property> providerProperties = propertyRepository.findByOwnerId(providerId);
        
        // Get all bookings for these properties
        List<Booking> providerBookings = providerProperties.stream()
            .flatMap(property -> bookingRepository.findByPropertyId(property.getId()).stream())
            .collect(Collectors.toList());

        // Populate property and seeker details for each booking
        return providerBookings.stream()
            .map(booking -> {
                // Set property details
                Property property = propertyRepository.findById(booking.getPropertyId())
                    .orElse(null);
                if (property != null) {
                    booking.setProperty(property);
                }

                // Set seeker details
                Seeker seeker = seekerRepository.findById(booking.getSeekerId())
                    .orElseThrow(() -> new RuntimeException("Seeker not found for ID: " + booking.getSeekerId()));
                booking.setSeeker(seeker);

                return booking;
            })
            .collect(Collectors.toList());
    }
}