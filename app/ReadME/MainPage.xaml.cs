using System.Diagnostics;
using System.IO.Compression;
using System.Xml;

namespace ReadME
{
    public partial class MainPage : ContentPage
    {
        HttpClient client = new();
        bool useXml = false;

        public MainPage()
        {
            InitializeComponent();
        }

        private async void Button_Clicked(object sender, EventArgs e)
        {
            try
            {
                //Call API
                var response = await client.GetAsync("http://10.0.2.2:3000/api/books/1");
                if (response.IsSuccessStatusCode)
                {
                    var content = response.Content;

                    Debug.WriteLine(content);
                    //Open epub ZIP
                    var json = new StreamReader(content.ReadAsStream()).ReadToEnd();

                    string b64 = json.Split("\"booEpub\":\"")[1].Split("\",\"")[0].Replace("\\n","").Replace(" ","").Trim();
                    var bytes = Convert.FromBase64String(b64);

                    Console.Write("");
                    ZipArchive archive = new ZipArchive(new MemoryStream(bytes));
                    var coverEntry = archive.GetEntry("OEBPS/Images/cover.png");
                    var coverStream = coverEntry.Open();

                    //Attach cover to UI
                    cover.Source = ImageSource.FromStream(() => coverStream);

                    //Load CONTENT (meta data)
                    var bookTitle = "not found";
                    var contentString = new StreamReader(archive.GetEntry("OEBPS/content.opf").Open()).ReadToEnd();


                    if (useXml)
                    {
                        #region XML version
                        //load meta-data from xml
                        var xmlDoc = new XmlDocument();
                        xmlDoc.LoadXml(contentString);

                        // Retrieve the title element
                        XmlNode titleNode = xmlDoc.SelectSingleNode("//dc:title", GetNamespaceManager(xmlDoc));

                        bookTitle = titleNode != null ? titleNode.InnerText : "not found with xml";
                        #endregion
                    }
                    else
                    {
                        #region plain text version
                        
                        #endregion
                    }
                    //title.Text = bookTitle;

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

        private void Switch_Toggled(object sender, ToggledEventArgs e)
        {
            useXml = e.Value;
        }
    }
}
