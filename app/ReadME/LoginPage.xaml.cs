namespace ReadME;

public partial class LoginPage : ContentPage
{
	public LoginPage()
	{
		InitializeComponent();
	}

    private void OnSignupClicked(object sender, EventArgs e)
    {
		Navigation.PushAsync(new SignupPage());
    }

    private void OnLoginClicked(object sender, EventArgs e)
    {
        Navigation.PushAsync(new MainPage());
    }
}