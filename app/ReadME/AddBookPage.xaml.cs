
namespace ReadME;

public partial class AddBookPage : ContentPage
{
    public AddBookPage()
    {
        InitializeComponent();
    }

    private async void OnAddBookClicked(object sender, EventArgs e)
    {
        // STATUS OK
        /*PermissionStatus status = await Permissions.CheckStatusAsync<Permissions.Media>();
        Console.WriteLine(status.ToString());
        if (status != PermissionStatus.Granted)
        {
            await Permissions.RequestAsync<Permissions.Media>();
        }*/

        var book = await FilePicker.PickAsync(new PickOptions
        {
            PickerTitle = "Choose the book you want to add",
            FileTypes = null
        });
        // If the filepicker gets nothing, return
        if (book == null)
            return;
        
        // If the file isn't an epub, returns an error 
        if (!book.FileName.EndsWith("epub"))
        {
            await Shell.Current.DisplayAlert("Error", "The selected file extension is not supported", "OK");
            return;
        }
        await Shell.Current.DisplayAlert("Done", "The selected file was successfully imported", "OK");

    }
}