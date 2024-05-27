using System.Diagnostics;
using System.IO.Compression;
using System.Xml;

namespace ReadME;

public partial class DisplayAllBooksPage : ContentPage
{
    HttpClient client = new();
    int compteur = 0;
    public DisplayAllBooksPage()
	{
		InitializeComponent();
        GetBooks();

    }

    private async void GetBooks()
    {
        try
        {
            //Call API
            var response = await client.GetAsync("http://10.0.2.2:3000/api/books");
            if (response.IsSuccessStatusCode)
            {
                var content = response.Content;

                Debug.WriteLine(content);
                //Open epub ZIP
                var json = new StreamReader(content.ReadAsStream()).ReadToEnd();

                string[] results = json.Split("}");

                string b64;

                

                foreach (string result in results)
                {

                    Image image = new Image
                    {
                        HeightRequest = 150,
                        WidthRequest = 150
                    };
                    Label label = new Label();
                    b64 = result.Split("\"booEpub\":\"")[1].Split("\",\"")[0].Replace("\\n", "").Replace(" ", "").Trim();

                    var bytes = Convert.FromBase64String(b64);
                    ZipArchive archive = new ZipArchive(new MemoryStream(bytes));
                    var coverEntry = archive.GetEntry("OEBPS/Images/cover.png");
                    var coverStream = coverEntry.Open();

                    image.Source = ImageSource.FromStream(() => coverStream);

                    var bookTitle = "not found";
                    var contentString = new StreamReader(archive.GetEntry("OEBPS/content.opf").Open()).ReadToEnd();

                    int start = contentString.IndexOf("<dc:title>") + 10;
                    int end = contentString.IndexOf("</dc:title>");

                    bookTitle = (start != -1 && end != -1) ? contentString.Substring(start, end - start) : "Title node not found.";

                    label.Text = bookTitle;

                    books.Children.Add(label);
                    books.Children.Add(image);
                    compteur++;
                    if(compteur == results.Length - 2)
                    {
                        break;
                    }
                }
            }
            else
            {
                throw new Exception($"Bad status : {response.StatusCode}, {response.Headers},{response.Content}");
            }
        }
        catch (Exception ex)
        {
            await DisplayAlert(ex.Message, ex.StackTrace, "ok");
        }


    }

    private static XmlNamespaceManager GetNamespaceManager(XmlDocument xmlDoc)
    {
        XmlNamespaceManager nsManager = new XmlNamespaceManager(xmlDoc.NameTable);
        nsManager.AddNamespace("dc", "http://purl.org/dc/elements/1.1/");
        return nsManager;
    }
}