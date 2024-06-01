//package com.test.event;
//
//import org.springframework.amqp.rabbit.core.RabbitTemplate;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//
///**
// * Handles the communication with the Event Bus.
// */
//
//@Component
//public class EventDispatcher {
//
//    private RabbitTemplate rabbitTemplate;
//
//    private String testExchange;
//
//    private String testRoutingKey;
//
//    @Autowired
//    EventDispatcher(final RabbitTemplate rabbitTemplate,
//                    @Value("${test.exchange}") final String testExchange,
//                    @Value("${test.log.key}") final String testRoutingKey) {
//    	
//        this.rabbitTemplate = rabbitTemplate;
//        this.testExchange = testExchange;
//        this.testRoutingKey = testRoutingKey;
//    }
//
//    public void send(final testEntityLogEvent testEntityLogEvent) {
//    	
//        rabbitTemplate.convertAndSend(
//        		testExchange,
//        		testRoutingKey,
//        		testEntityLogEvent);
//        
//        System.out.println("TEST  --- Event sent!");
//    }
//}
