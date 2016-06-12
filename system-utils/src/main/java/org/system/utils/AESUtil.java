package org.system.utils;


import java.security.SecureRandom;

import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Hex;



/**
 * @author fh
 *
 */
public class AESUtil {
	
	public static Hex hex = new Hex();

	/**
	 * @param content
	 * @param key
	 * @return
	 * @throws Exception
	 * @throws Exception
	 */
	public static String encrypt(String content, String key)
			throws Exception, Exception {
		KeyGenerator keyGenerator = KeyGenerator.getInstance("AES");
		keyGenerator.init(128, new SecureRandom(key.getBytes()));
		Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
		cipher.init(Cipher.ENCRYPT_MODE, new SecretKeySpec(keyGenerator
				.generateKey().getEncoded(), "AES"));
		byte[] doFinal = cipher.doFinal(content.getBytes());
		return new String(hex.encodeHex(doFinal));
	}

	/**
	 * @param bytes
	 * @param key
	 * @return
	 * @throws Exception
	 */
	public static String decrypt(byte[] bytes, String key)
			throws Exception {
		KeyGenerator kgen = KeyGenerator.getInstance("AES");
		kgen.init(128, new SecureRandom(key.getBytes()));

		Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
		cipher.init(Cipher.DECRYPT_MODE, new SecretKeySpec(kgen.generateKey()
				.getEncoded(), "AES"));
		byte[] decryptBytes = cipher.doFinal(bytes);
		return new String(decryptBytes);
	}

	

	/**
	 * @param buf
	 * @return
	 */
	public static String parseByte2HexStr(byte buf[]) {
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < buf.length; i++) {
			String hex = Integer.toHexString(buf[i] & 0xFF);
			if (hex.length() == 1) {
				hex = '0' + hex;
			}
			sb.append(hex.toUpperCase());
		}
		return sb.toString();
	}

	/**
	 * @param hexStr
	 * @return
	 */
	public static byte[] parseHexStr2Byte(String hexStr) {
		if (hexStr.length() < 1)
			return null;
		byte[] result = new byte[hexStr.length() / 2];
		for (int i = 0; i < hexStr.length() / 2; i++) {
			int high = Integer.parseInt(hexStr.substring(i * 2, i * 2 + 1), 16);
			int low = Integer.parseInt(hexStr.substring(i * 2 + 1, i * 2 + 2),
					16);
			result[i] = (byte) (high * 16 + low);
		}
		return result;
	}
	
	/**
	 * @param args
	 * @throws Exception
	 */
	public static void main(String[] args) throws Exception {
		String content = "123456";
		String key = "fenghuohuofeng11";
		System.out.println("明文：" + content);
		String encryptToBytes = AESUtil.encrypt(content, key);
		System.out.println("密文：" + encryptToBytes);
		System.out
				.println("明文："
						+ AESUtil.decrypt(AESUtil.hex.decode(encryptToBytes.getBytes()), key));

		/*System.out.println(AESUtil.decrypt(
								AESUtil.parseHexStr2Byte("5DD6B1D79346303DB2944EDFE4B6EC301B45251B6EA632AB53B475E13AFDE4A2"),"fenghuohuoefeng"));
*/	}

}
