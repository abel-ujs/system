package org.system.utils.concurrent;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Main {

	public static void main(String[] args) {
		BlockingQueue<Entity> queue = new ArrayBlockingQueue<Entity>(10);
		ExecutorService exec = Executors.newFixedThreadPool(10);
		Producer producer = new Producer(queue,exec);
		Consumer consumer = new Consumer(queue, exec);
		exec.execute(producer);
		exec.execute(consumer);

	}

}
