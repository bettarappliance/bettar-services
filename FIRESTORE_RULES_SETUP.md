# Firestore Security Rules Setup

## Problem
If you're getting "Missing or insufficient permissions" errors when trying to add, edit, or delete appliances, you need to update your Firestore security rules.

## Solution

### Step 1: Go to Firebase Console
1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Firestore Database** in the left sidebar
4. Click on the **Rules** tab

### Step 2: Update Security Rules

Replace your current rules with the following to allow read/write access to the `appliances` collection:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to appliances for all users
    match /appliances/{document=**} {
      allow read: if true;
      allow write: if true; // For admin access, you may want to add authentication later
    }
    
    // Allow read access to projects for all users
    match /projects/{document=**} {
      allow read: if true;
      allow write: if true; // For admin access, you may want to add authentication later
    }
    
    // Default: deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### Step 3: Publish Rules
1. Click **Publish** button
2. Wait for confirmation that rules are published

### Step 4: Test
Try adding, editing, or deleting an appliance again. The permissions error should be resolved.

## Security Note

⚠️ **Important**: The rules above allow public write access. For production, you should implement proper authentication:

1. Set up Firebase Authentication
2. Update rules to check for authenticated admin users:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to check if user is admin
    function isAdmin() {
      return request.auth != null && 
             request.auth.token.admin == true;
    }
    
    match /appliances/{document=**} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    match /projects/{document=**} {
      allow read: if true;
      allow write: if isAdmin();
    }
  }
}
```

For now, the public write access will work for development and testing purposes.
