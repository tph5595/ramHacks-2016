import java.io.*;
import java.util.regex.*;
import java.util.*;

public class HardwareParse {

    //regex stuff
    public static final String REGEX = "<h4>(.+?)</h4>";
    public static final String REGEX2 = "([0-9]+/[0-9]+)";
    public static Pattern p;
    public static Matcher m;

    public static void main(String[] args) throws FileNotFoundException, UnsupportedEncodingException {
        
        //initial dem variables
        File inFile = null;
        String line = "";
        String input = "";
        StringBuilder inputBuilder = new StringBuilder();
        ArrayList<String> hardware = new ArrayList<String>();
        ArrayList<String> stock = new ArrayList<String>();

        
        //open dat file (html file from argument)
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
            input = inputBuilder.toString();
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        StringBuilder sb = new StringBuilder();
        //Finding matches in the hardware html we took as input
        p = Pattern.compile(REGEX);
        m = p.matcher(input);
        
        sb.append("The hardware available are: \n");
        m.find();
        while(m.find())
        {
        	hardware.add(m.group(1));
        	System.out.println(m.group(1));
        }
        
        p = Pattern.compile(REGEX2);
        m = p.matcher(input);
        m.find();
        while(m.find())
        {
        	stock.add(m.group(1));
        	System.out.println(m.group(1));
        }       
        for(int i = 0; i < hardware.size(); i++)
        {
        	sb.append(hardware.get(i) + ": " + stock.get(i) + " available \n");
        }
        
        PrintWriter writer = new PrintWriter("hardware.txt", "UTF-8");
        writer.println(sb.toString());
        writer.close();
    }

}