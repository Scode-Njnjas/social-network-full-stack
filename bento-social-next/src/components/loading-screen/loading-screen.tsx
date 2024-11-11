import SplashScreen from './splash-sceen';

// ----------------------------------------------------------------------

export default function LoadingScreen() {
  return (
    <div className="px-5 w-full flex flex-grow-[1] min-h-full items-center justify-center">
      <SplashScreen />
      {/* Loading... */}
    </div>
  );
}
