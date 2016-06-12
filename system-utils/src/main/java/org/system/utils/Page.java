package org.system.utils;

public class Page {
	private String current;
	private String size;
	private String total;
	
	public Page() {
		super();
	}
	
	public Page(String current, String size) {
		super();
		this.current = current;
		this.size = size;
	}

	public String getCurrent() {
		return current;
	}
	public void setCurrent(String current) {
		this.current = current;
	}
	public String getSize() {
		return size;
	}
	public void setSize(String size) {
		this.size = size;
	}
	public String getTotal() {
		return total;
	}
	public void setTotal(String total) {
		this.total = total;
	}
	
}
