package org.system.utils.concurrent;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;

public class Producer implements Runnable{
	
	private BlockingQueue<Entity> queue;
	private ExecutorService exec;
	public Producer(BlockingQueue<Entity> queue,ExecutorService exec){
		this.queue=queue;
		this.exec=exec;
	}

	@Override
	public void run() {
		while(!exec.isShutdown()){
			Entity e = new Entity();
			try {
				Thread.sleep(200);
				queue.put(e);
				System.out.println("produce:"+e);
			} catch (InterruptedException e1) {
				e1.printStackTrace();
			}
		}
	}

}
