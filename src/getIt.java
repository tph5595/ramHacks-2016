/*
 * This program will:
 * 1.	Read https://mlh.io/seasons/na-2017/events
 * 2.	Find all hackathon URLs
 * 3.	Write all URLs to URLS.txt file to get parsed by Parse.java
 */
import java.util.regex.*;
public class getIt {

	public static final String REGULAR_EXPRESSION = "(http|https)://.*(com|io|edu|org)";
	public static Pattern pattern;
	public static Matcher matcher;
			
	public getIt(String input)
	{
		this.input = input;
	}
	
	public String nextToken()
	{
		if(input.length() == 0)
			return null;
		String temp = "";
		pattern = Pattern.compile(REGULAR_EXPRESSION);
		matcher = pattern.matcher(input);
		if(matcher.lookingAt())
		{
			temp = matcher.group(0);
			input = input.substring(matcher.end(),input.length());
			return temp;
		}
		return null;
	}
			
	public static void main(String[] args) {
		
		StringBuilder inputBuilder = new StringBuilder();
		File inFile = null;
		String input = "";
        String line = null;
        String temp = "";
        
        File inFile = null;
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
        
        getIt tokenizer = new getIt(input);
        while(input!= null && input.length() > 0)
        {
        	input = tokenizer.nextToken();
        	sb.append(input);
        	sb.append("\n");
        }
        
        File outFile = null;
        if (0 < args.length)
           outFile = new File(args[1]);
        else
        {
           System.err.println("Invalid arguments count:" + args.length);
           System.exit(0);
        }	        
        FileWriter fileWriter = new FileWriter(outFile);
        BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);
        bufferedWriter.write(sb.toString());
        bufferedWriter.close();
        System.out.println(sb.toString());
       
	}

}
