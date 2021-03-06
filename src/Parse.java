
/*
 * This program will:
 * 1.	Take URL as input to parse it for the hackathon name
 * 2.	Take html file(s) as input for schedule
 * 3.	write to hackathonName.txt the parsed schedule
 */
import java.io.*;
import java.net.URL;
import java.util.regex.*;

public class Parse {

public static String input = "";
public static final String ENDSEQUENCE = "this is the end sequence 123982349234\n\naiusdnfb";

public static void main(String[] args) throws IOException {

								StringBuilder inputBuilder = new StringBuilder();
								StringBuilder endBuilder = new StringBuilder();
								String regexMonthFinder = "(([Jj]anuary)|([Ff]ebuary)|([Mm]arch)|([Aa]pril)|([Mm]ay)|([Jj]une)|([Jj]uly)|([Aa]ugust)|([Ss]ept(ember)?)|([Oo]ctober)|([Nn]ovember)|([Dd]ecember)) [0-3]?[0-9]";
								Pattern p = Pattern.compile(regexMonthFinder);
								File inFile = null;
								// URL inURL = null;
								String line = null;
								boolean first = true;
								boolean loop = true;
								String tempName = args[0];
								//String tempName = "https://www.bigredhacks.com/";

								// opening the file stuff and putting into a string
								if (0 <= args.length) {
																// DON'T FORGET TO CHANGE THIS
																// BACK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
																inFile = new File(args[1]);
																// inURL = new URL(args[0]);
								} else {
																System.err.println("Invalid arguments count:" + args.length);
																System.exit(0);
								}
								FileReader fileReader = null;
								// BufferedReader in = null;
								try {
																fileReader = new FileReader(inFile);
																// in = new BufferedReader((new
																// InputStreamReader(inURL.openStream())));
								} catch (FileNotFoundException e1) {
																e1.printStackTrace();
								}
								BufferedReader bufferedReader = new BufferedReader(fileReader);
								try {
																while ((line = bufferedReader.readLine()) != null) {
																								// System.out.println("making sb");
																								inputBuilder.append(line);
																}
																bufferedReader.close();
																inputBuilder.append(ENDSEQUENCE);
																input = inputBuilder.toString();
								} catch (IOException e) {
																e.printStackTrace();
								}
								Matcher m = p.matcher(input);
								StringBuilder miniSB = new StringBuilder();
								int count = 0;
								boolean startAdding = false;
								while (count < tempName.length()) {
																if (tempName.substring(count, count + 3).equals("://")) {
																								count += 2;
																								startAdding = true;
																} else if (tempName.substring(count, count + 3).equals("www")) {
																								count += 3;
																} else if (startAdding) {
																								if (tempName.charAt(count) != '.')
																																miniSB.append(tempName.charAt(count));
																								else
																																break;
																}
																count++;
								}
								String hackathonName = miniSB.toString();
								if (m.find()) {
																if (m.group().substring(0, 5).toLowerCase().equals("sept "))
																								endBuilder.append(hackathonName + " starts on September" + m.group().substring(4, m.group().length()));
																else
																								endBuilder.append(hackathonName + " starts on " + m.group());

								} else
																endBuilder.append("A start date mysteriously couldn't be found for this Hackathon");

								// real fun begins
								int inputIndex = 0;
								String[] daysArrays = { "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday" };
								int dayIndex = -1;

								// while end sequence not triggerd
								while (notEndSequence(inputIndex)) {
																// checking for the day
																// System.out.println("start the first while");
																dayIndex = stringEquals(inputIndex, daysArrays);
																while (-1 == dayIndex) {
																								inputIndex++;
																								dayIndex = stringEquals(inputIndex, daysArrays);
																								// System.out.println("while -1 == dayIndex");

																								// no schedule fix
																								if (!notEndSequence(inputIndex)) {
																																endBuilder.append("No Schedule found for " + hackathonName);
																																System.exit(0);
																								}
																}
																// adding to what Alexa will say string
																endBuilder.append(". On " + daysArrays[dayIndex] + " ");
																inputIndex++;
																while (notEndSequence(inputIndex)) {
																								// looking for what time on that day
																								while (input.charAt(inputIndex + 2) != ':' || !isNumber(input.charAt(inputIndex + 1))) {
																																// if the day changes
																																// System.out.println("deep while");
																																dayIndex = stringEquals(inputIndex, daysArrays);
																																if (dayIndex != -1) {
																																								endBuilder.append(". On " + daysArrays[dayIndex] + " ");
																																								first = true;
																																}
																																inputIndex++;
																																if (!notEndSequence(inputIndex)) {
																																								endBuilder.append(".");
																																								// System.out.println(endBuilder.toString());
																																								endBuilder.append(input.charAt(inputIndex));
																																								PrintWriter writer = new PrintWriter(hackathonName + ".txt", "UTF-8");
																																								writer.println(endBuilder.toString());
																																								writer.close();
																																								System.exit(0);
																																}
																								}
																								// if time is two digits (10+)
																								if (input.charAt(inputIndex) != '1') {
																																inputIndex++;
																								}
																								// add dat time
																								if (first) {
																																endBuilder.append("at ");
																																first = false;
																								} else {
																																endBuilder.append(". At ");
																								}
																								char[] tempChars = {' ','a','A','p','P'};
																								while (doesNotEqualCollection(input.charAt(inputIndex), tempChars)) {
																																// System.out.println("not space");
																																endBuilder.append(input.charAt(inputIndex));
																																inputIndex++;
																								}
																								while (!input.substring(inputIndex, inputIndex + 1).toLowerCase().equals("a")
																															&& !input.substring(inputIndex, inputIndex + 1).toLowerCase().equals("p")) {
																																// System.out.println("a or p");
																																inputIndex++;
																								}
																								endBuilder.append(" " + input.charAt(inputIndex) + "m,");
																								if(input.charAt(inputIndex+1) != 'm' && input.charAt(inputIndex) != 'M')
																								{
																																inputIndex--;
																								}
																								if (input.charAt(inputIndex + 1) == '.') {
																																inputIndex += 2;
																								}
																								inputIndex += 2;
																								// if details are right after time
																								loop = true;
																								// System.out.println(input.substring(inputIndex-1,inputIndex+1));
																								while (input.charAt(inputIndex) != '<') {
																																// System.out.println("before <");
																																if (input.charAt(inputIndex) == '-') {
																																								if (input.charAt(inputIndex + 1) == ' ') {
																																																inputIndex++;
																																								}
																																} else {
																																								if (isNumber(input.charAt(inputIndex))) {
																																																while (input.charAt(inputIndex) != 'm' && input.charAt(inputIndex) != 'M')
																																																								inputIndex++;
																																																break;
																																								}
																																								endBuilder.append(input.charAt(inputIndex));
																																								if (input.charAt(inputIndex) != ' ') {
																																																loop = false;
																																								}
																																}
																																inputIndex++;
																								}
																								// while not ">(letter)"
																								if (loop) {
																																endBuilder.append(" ");
																																while (input.charAt(inputIndex - 1) != '>' || !isLetter(input.charAt(inputIndex))) {
																																								// System.out.println("finding details");
																																								inputIndex++;
																																}
																																while (input.charAt(inputIndex) != '<') {
																																								// System.out.println("adding details");
																																								endBuilder.append(input.charAt(inputIndex));
																																								inputIndex++;
																																}
																								}
																}
								}
								// System.out.println(endBuilder.toString());
}

private static boolean isNumber(char ch) {
								return (ch >= '0' && ch <= '9');
}

private static boolean isLetter(char ch) {
								return ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z'));
}

// returns index of matching string, -1 if none matched
private static int stringEquals(int startIndex, String[] strArray) {
								for (int k = 0; k < strArray.length; k++) {
																if (input.substring(startIndex, startIndex + strArray[k].length()).toLowerCase().equals(strArray[k]))
																								return k;
								}
								return -1;
}

private static boolean notEndSequence(int i) {
								return !(input.substring(i, i + ENDSEQUENCE.length()).equals(ENDSEQUENCE));
}

private static boolean doesNotEqualCollection(char ch, char[] cArr) {
								for (int k = 0; k < cArr.length; k++) {
																if (ch == cArr[k])
																								return false;
								}
								return true;
}

}
