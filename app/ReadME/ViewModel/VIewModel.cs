using ReadME.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System.Runtime.CompilerServices;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.IO.Compression;
using System.Security.Cryptography;
using System.Text.Json;
using static System.Reflection.Metadata.BlobBuilder;

namespace ReadME.ViewModel
{
    public partial class VIewModel : ObservableObject
    {
        [ObservableProperty]
        private ObservableCollection<Books> listBooks = new ObservableCollection<Books>();

        public VIewModel()
        {
            getBooks();
        }
        public async void getBooks()
        {
            var client = new HttpClient();
            client.Timeout = TimeSpan.FromSeconds(10);
         
            var request = new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri("http://10.0.2.2:3000/api/books"),
          
            };


            using (var response = await client.SendAsync(request))
            {
                response.EnsureSuccessStatusCode();
                var body = await response.Content.ReadAsStringAsync();

                Debug.WriteLine("=======================================");
                Debug.WriteLine(body);
                Debug.WriteLine("=======================================");

                ApiResult result = JsonSerializer.Deserialize<ApiResult>(body);

                foreach (var item in result.data)
                {
                    listBooks.Add(item);
                }
            }
        }
    }
}
