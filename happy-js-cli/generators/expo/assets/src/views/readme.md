> [Up One Level](../readme.md)

# Views

Independent views belong in this folder.

- [DefaultExpoView/](DefaultExpoView/readme.md) - The view (modified for this example) created by the expo typescript template.
- [DefaultReactView/](DefaultReactView/readme.md) - The view (modified for this example) created by the Create-React-App.
- RootStackParamList.type.ts - Used by the MainApp and the underlying views to help generate parameter types.

## Extra Notes

When adding a view that can be navigated to, please add it to `RootStackParamList.type.ts` and `../MainApp.tsx` to utilize it fully.