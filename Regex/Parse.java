
/*
 * This program will:
 * 1.	Take html file(s) as input
 * 2.	Parse html file for schedule and hackathon name
 * 3.	write to hackathon name the parsed schedule
 */
import java.io.*;

public class Parse {

	public static String input = "";

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		StringBuilder inputBuilder = new StringBuilder();
		StringBuilder endBuilder = new StringBuilder();
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

		// real fun begins
		int inputIndex = 0;
		String[] daysArrays = { "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday" };
		int dayIndex = -1;
		//while end sequence not triggerd
		while (notEndSquence(inputIndex)) {
			//checking for the day
			dayIndex = stringEquals(inputIndex, daysArrays);
			while (-1 == dayIndex) {
				inputIndex++;
			}
			//adding to what Alexa will say string
			endBuilder.append("On " + daysArrays[dayIndex] + " ");
			//looking for what time on that day
			while (input.charAt(inputIndex + 2) != ':') {
				inputIndex++;
			}
			if (input.charAt(inputIndex) != 1) {
				inputIndex++;
			}
			while(input.charAt(inputIndex) != ' ')
			{
				endBuilder.append(input.charAt(inputIndex));
			}
			
			
		}
	}

	// returns index of matching string, -1 if none matched
	private static int stringEquals(int startIndex, String[] strArray) {
		for (int k = 0; k < strArray.length; k++) {
			if (input.substring(startIndex, startIndex+strArray[k].length()).toLowerCase().equals(strArray[k]))
				return k;
		}
		return -1;
	}

	private static boolean notEndSquence(int i) {
		return !(input.substring(i, i + 13) == "End Sequence!");
	}

}
