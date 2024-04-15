namespace ReadME;

public partial class SignupPage : ContentPage
{
	public SignupPage()
	{
		InitializeComponent();
	}

    private void OnLoginClicked(object sender, EventArgs e)
    {
		Navigation.PushAsync(new LoginPage());
    }

    private void OnSignupClicked(object sender, EventArgs e)
    {
        // Mettre vérification des identifiants
        Navigation.PushAsync(new MainPage());
    }
}