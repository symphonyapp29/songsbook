
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

// @react-native-community/async-storage
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// @react-native-community/clipboard
import com.reactnativecommunity.clipboard.ClipboardPackage;
// @react-native-community/netinfo
import com.reactnativecommunity.netinfo.NetInfoPackage;
// @react-native-community/slider
import com.reactnativecommunity.slider.ReactSliderPackage;
// @react-native-firebase/app
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
// @react-native-firebase/auth
import io.invertase.firebase.auth.ReactNativeFirebaseAuthPackage;
// @react-native-firebase/messaging
import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingPackage;
// @react-native-google-signin/google-signin
import com.reactnativegooglesignin.RNGoogleSigninPackage;
// @react-native-masked-view/masked-view
import org.reactnative.maskedview.RNCMaskedViewPackage;
// @react-native-picker/picker
import com.reactnativecommunity.picker.RNCPickerPackage;
// react-native-blob-util
import com.ReactNativeBlobUtil.ReactNativeBlobUtilPackage;
// react-native-device-info
import com.learnium.RNDeviceInfo.RNDeviceInfo;
// react-native-fast-image
import com.dylanvann.fastimage.FastImageViewPackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.RNGestureHandlerPackage;
// react-native-image-picker
import com.imagepicker.ImagePickerPackage;
// react-native-linear-gradient
import com.BV.LinearGradient.LinearGradientPackage;
// react-native-orientation-locker
import org.wonday.orientation.OrientationPackage;
// react-native-pdf
import org.wonday.pdf.RNPDFPackage;
// react-native-rate
import com.reactnativerate.RNRatePackage;
// react-native-razorpay
import com.razorpay.rn.RazorpayPackage;
// react-native-reanimated
import com.swmansion.reanimated.ReanimatedPackage;
// react-native-restart
import com.reactnativerestart.RestartPackage;
// react-native-safe-area-context
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
// react-native-screens
import com.swmansion.rnscreens.RNScreensPackage;
// react-native-share
import cl.json.RNSharePackage;
// react-native-svg
import com.horcrux.svg.SvgPackage;
// react-native-track-player
import com.doublesymmetry.trackplayer.TrackPlayer;
// react-native-vector-icons
import com.oblador.vectoricons.VectorIconsPackage;
// react-native-video
import com.brentvatne.react.ReactVideoPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  private MainPackageConfig mConfig;

  public PackageList(ReactNativeHost reactNativeHost) {
    this(reactNativeHost, null);
  }

  public PackageList(Application application) {
    this(application, null);
  }

  public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
    this.reactNativeHost = reactNativeHost;
    mConfig = config;
  }

  public PackageList(Application application, MainPackageConfig config) {
    this.reactNativeHost = null;
    this.application = application;
    mConfig = config;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(mConfig),
      new AsyncStoragePackage(),
      new ClipboardPackage(),
      new NetInfoPackage(),
      new ReactSliderPackage(),
      new ReactNativeFirebaseAppPackage(),
      new ReactNativeFirebaseAuthPackage(),
      new ReactNativeFirebaseMessagingPackage(),
      new RNGoogleSigninPackage(),
      new RNCMaskedViewPackage(),
      new RNCPickerPackage(),
      new ReactNativeBlobUtilPackage(),
      new RNDeviceInfo(),
      new FastImageViewPackage(),
      new RNGestureHandlerPackage(),
      new ImagePickerPackage(),
      new LinearGradientPackage(),
      new OrientationPackage(),
      new RNPDFPackage(),
      new RNRatePackage(),
      new RazorpayPackage(),
      new ReanimatedPackage(),
      new RestartPackage(),
      new SafeAreaContextPackage(),
      new RNScreensPackage(),
      new RNSharePackage(),
      new SvgPackage(),
      new TrackPlayer(),
      new VectorIconsPackage(),
      new ReactVideoPackage()
    ));
  }
}