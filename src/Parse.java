
/*
 * This program will:
 * 1.	Take html file(s) as input
 * 2.	Parse html file for schedule and hackathon name
 * 3.	write to hackathon name the parsed schedule
 */
import java.io.*;
import java.util.regex.*;

public class Parse {

	public static String input = "";

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		StringBuilder inputBuilder = new StringBuilder();
		StringBuilder endBuilder = new StringBuilder();
		String regexMonthFinder = "(([Jj]anuary)|([Ff]ebuary)|([Mm]arch)|([Aa]pril)|([Mm]ay)|([Jj]une)|([Jj]uly)|([Aa]ugust)|([Ss]ept(ember)?)|([Oo]ctober)|([Nn]ovember)|([Dd]ecember)) [0-3][0-9]";
		Pattern p = Pattern.compile(regexMonthFinder);
		File inFile = null;
		String line = null;

		// opening the file stuff and putting into a string
		if (0 < args.length) {
			inFile = new File(args[0]);
		} else {
			System.err.println("Invalid arguments count:" + args.length);
			System.exit(0);
		}
		FileReader fileReader = null;
		try {
			fileReader = new FileReader(inFile);
		} catch (FileNotFoundException e1) {
			e1.printStackTrace();
		}
		BufferedReader bufferedReader = new BufferedReader(fileReader);
		try {
			while ((line = bufferedReader.readLine()) != null) {
				inputBuilder.append(line);
			}
			bufferedReader.close();
			inputBuilder.append("End Sequence!");
			input = inputBuilder.toString();
		} catch (IOException e) {
			e.printStackTrace();
		}
		Matcher m = p.matcher(input);
		if (m.find()) {
			if (m.group().substring(0, 4).toLowerCase().equals("sept"))
				endBuilder.append("This hackathon starts on September" + m.group().substring(4, m.group().length()));
			else
				endBuilder.append("This hackathon starts on " + m.group());
		}

		// real fun begins
		int inputIndex = 0;
		String[] daysArrays = { "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday" };
		int dayIndex = -1;

		// while end sequence not triggerd
		while (notEndSequence(inputIndex)) {
			// checking for the day
			dayIndex = stringEquals(inputIndex, daysArrays);
			while (-1 == dayIndex) {
				inputIndex++;
			}
			// adding to what Alexa will say string
			endBuilder.append("On " + daysArrays[dayIndex] + " ");
			inputIndex++;
			while (notEndSequence(inputIndex)) {
				// looking for what time on that day
				while (input.charAt(inputIndex + 2) != ':') {
					// if the day changes
					dayIndex = stringEquals(inputIndex, daysArrays);
					if (dayIndex != -1)
						endBuilder.append(" On " + daysArrays[dayIndex] + " ");
					inputIndex++;
				}
				// if time is two digits (10+)
				if (input.charAt(inputIndex) != 1) {
					inputIndex++;
				}
				// add dat time
				endBuilder.append("At ");
				while (input.charAt(inputIndex) != ' ') {
					endBuilder.append(input.charAt(inputIndex));
					inputIndex++;
				}
				while (input.substring(inputIndex, inputIndex + 1).toLowerCase() != "a"
						&& input.substring(inputIndex, inputIndex + 1).toLowerCase() != "p") {
					inputIndex++;
				}
				endBuilder.append(" " + input.charAt(inputIndex) + "m, ");
				inputIndex++;
				// while not ">(letter)"
				while (input.charAt(inputIndex - 1) != '>' || !isLetter(input.charAt(inputIndex))) {
					inputIndex++;
				}
				while (input.charAt(inputIndex) != '<') {
					endBuilder.append(input.charAt(inputIndex));
				}
			}
		}
		System.out.println(endBuilder.toString());
	}

	private static boolean isLetter(char ch) {
		// TODO Auto-generated method stub
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
		return !(input.substring(i, i + 13) == "End Sequence!");
	}

}
