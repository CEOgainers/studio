# How to Apply Firestore Security Rules

The error **"missing or insufficient permissions"** means your database's security rules are blocking the application. To fix this, you need to update your Firestore security rules.

The rules in `firestore.rules` are designed to be secure, only allowing users to access their own data.

## Follow these steps EXACTLY:

1.  **Open your Firebase Project:** Go to the [Firebase Console](https://console.firebase.google.com/).
2.  **Navigate to Firestore:** From the left-hand menu, select **Build > Firestore Database**.
3.  **Go to the Rules Tab:** Click on the **Rules** tab at the top of the page.
4.  **Replace the Rules:** Copy the **ENTIRE** content from the `firestore.rules` file in your project.
5.  **Paste and Publish:** Paste the copied content into the rules editor in the Firebase console, completely **REPLACING** the existing rules.
6.  **Click "Publish".**

Your sign-up and sign-in processes should now work correctly.
