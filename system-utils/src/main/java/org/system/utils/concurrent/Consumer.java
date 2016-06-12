package org.system.utils.concurrent;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;

public class Consumer implements Runnable {
	private BlockingQueue<Entity> queue;
	private ExecutorService exec;
	public Consumer(BlockingQueue<Entity> queue,ExecutorService exec){
		this.queue = queue;
		this.exec = exec;
	}

	@Override
	public void run() {
		while(!exec.isShutdown()){
			try {
				Thread.sleep(200);
				Entity take = queue.take();
				System.out.println("consumer:"+take);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}

}
