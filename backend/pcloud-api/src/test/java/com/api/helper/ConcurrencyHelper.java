package com.api.helper;

import org.junit.jupiter.api.function.Executable;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ConcurrencyHelper {

    public static void run(final Executable executable, final int numberOfRequests) throws InterruptedException {
        ExecutorService executorService = Executors.newFixedThreadPool(numberOfRequests);
        CountDownLatch latch = new CountDownLatch(numberOfRequests);

        for (int i = 0; i < numberOfRequests; i++) {
            executorService.submit(() -> {
                try {
                    executable.execute();
                } catch (Throwable e) {
                    System.out.println("메서드 작동 실패! " + e.getClass());
                } finally {
                    latch.countDown();
                }
            });
        }

        latch.await();
    }
}
