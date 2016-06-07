package com.fh.utils;

import java.security.Key;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Hex;


/**
 * 用来进行AES的加密和解密程序
 * 
 * @author Steven
 * 
 */
public class AESCoder {

	// 加密算法
	private static String ALGO="AES";

	// 加密密钥
	// private static final byte[] keyValue = new byte[] { 'T', 'h', 'e',
	// 'B','e', 's', 't', 'S', 'e', 'c', 'r', 'e', 't', 'K', 'e', 'y' };
	// 16位的加密密钥
	private static byte[] keyValue="fenghuohuofeng11".getBytes();

	/**
	 * 用来进行加密的操作
	 * 
	 * @param Data
	 * @return
	 * @throws Exception
	 */
	public static String encrypt(String Data) throws Exception {
		;
		Key key = generateKey();
		Cipher c = Cipher.getInstance(ALGO);
		c.init(Cipher.ENCRYPT_MODE, key);
		byte[] encVal = c.doFinal(Data.getBytes());
		String encryptedValue = new Hex().encodeHexString(encVal);
		return encryptedValue;
	}

	/**
	 * 用来进行解密的操作
	 * 
	 * @param encryptedData
	 * @return
	 * @throws Exception
	 */
	public static String decrypt(String encryptedData) throws Exception {
		Key key = generateKey();
		Cipher c = Cipher.getInstance(ALGO);
		c.init(Cipher.DECRYPT_MODE, key);
		byte[] decordedValue = new Hex().decode(encryptedData.getBytes());
		byte[] decValue = c.doFinal(decordedValue);
		String decryptedValue = new String(decValue);
		return decryptedValue;
	}

	/**
	 * 根据密钥和算法生成Key
	 * 
	 * @return
	 * @throws Exception
	 */
	private static Key generateKey() throws Exception {
		Key key = new SecretKeySpec(keyValue, ALGO);
		return key;
	}
	
	public static void main(String[] args) throws Exception {  
        // 要进行加密的密码  
        String password = "123456";  
        // 进行加密后的字符串  
        String passwordEnc = AESCoder.encrypt(password);  
        String passwordDec = AESCoder.decrypt(passwordEnc);  
        System.out.println("原来的密码 : " + password);  
        System.out.println("加密后的密码 : " + passwordEnc);  
        System.out.println("解密后的原密码 : " + passwordDec);  
    }  
}