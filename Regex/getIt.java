/*
 * This program will:
 * 1.	Read https://mlh.io/seasons/na-2017/events
 * 2.	Find all hackathon URLs
 * 3.	Write all URLs to URLS.txt file to get parsed by Parse.java
 */
import java.util.*;
import java.util.regex.*;
import java.io.*;
public class getIt {

	public static final String REGULAR_EXPRESSION_1 = "(http|ftp|https)://([\\w_-]+(?:(?:\\.[\\w_-]+)+))([\\w.,@?^=%&:/~+#-]*?[\\w@?^=%&/~+#-])?";
	public static final String REGULAR_EXPRESSION_2 = "(s3\\.amazon|schema|facebook|twitter|https://mlh\\.io|oss\\.maxcdn|hackcon|dell|microsoft|instagram|cloudfront)";
	public static Pattern pattern;
	public static Matcher matcher;
	public String input = "";
	public String tempFile = "";
			
	public static void main(String[] args) throws IOException{
		
		StringBuilder inputBuilder = new StringBuilder();
		File inFile = null;
		String input = "";
        String line = null;
        String temp = "";
        String match = "";
        ArrayList<String> urlList = new ArrayList<String>();
        
        if (0 < args.length)
        {
           inFile = new File(args[0]);
        }
        else
        {
           System.err.println("Invalid arguments count:" + args.length);
           System.exit(0);
        } 
        FileReader fileReader = new FileReader(inFile);
        BufferedReader bufferedReader = new BufferedReader(fileReader);
        try
        {
        	while((line = bufferedReader.readLine()) != null)
        	{
                inputBuilder.append(line);
        	}
            bufferedReader.close();
            input = inputBuilder.toString();
        }
        catch (IOException e)
        {
        	e.printStackTrace();
        }
        
        StringBuilder sb = new StringBuilder();
        temp = input;
		pattern = Pattern.compile(REGULAR_EXPRESSION_1);
		matcher = pattern.matcher(temp);
        while(matcher.find())
        {   		
			match = matcher.group();
			System.out.println(match);
			urlList.add(match);
        }
        
        pattern = Pattern.compile(REGULAR_EXPRESSION_2);
        for(int i = 0; i < urlList.size(); i++)
        {
        		sb.append(urlList.get(i));
        		sb.append("\n");
        		
        }
        PrintWriter writer = new PrintWriter("urls.txt", "UTF-8");
        writer.println(sb.toString());
        writer.close();
	}
}
