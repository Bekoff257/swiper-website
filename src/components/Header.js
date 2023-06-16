import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import GithubStats from './GithubStats';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

function updateColorTheme() {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark', 'changing-theme');
  } else {
    document.documentElement.classList.remove('dark', 'changing-theme');
  }
  window.setTimeout(() => {
    document.documentElement.classList.remove('changing-theme');
  });
}

export default function Header() {
  const [setting, setSetting] = useState('system');
  const [navOpened, setNavOpened] = useState(false);
  const initial = useRef(true);

  useIsomorphicLayoutEffect(() => {
    const theme = localStorage.theme;
    if (theme === 'light' || theme === 'dark') {
      setSetting(theme);
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (setting === 'system') {
      localStorage.removeItem('theme');
    } else if (setting === 'light' || setting === 'dark') {
      localStorage.theme = setting;
    }
    if (initial.current) {
      initial.current = false;
    } else {
      updateColorTheme();
    }
  }, [setting]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', updateColorTheme);

    function onStorage() {
      updateColorTheme();
      const theme = localStorage.theme;
      if (theme === 'light' || theme === 'dark') {
        setSetting(theme);
      } else {
        setSetting('system');
      }
    }
    window.addEventListener('storage', onStorage);

    return () => {
      mediaQuery.removeEventListener('change', updateColorTheme);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const onNavClick = (e) => {
    if (e.target && e.target.closest('a')) {
      setNavOpened(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 h-16 bg-surface-2 py-6">
      <div className="mx-auto flex h-full items-center justify-between px-4 sm:px-6">
        {/* Left */}
        <Link
          href="/"
          className="relative flex flex-shrink-0 items-center text-inherit hover:no-underline dark:text-white"
        >
          <svg
            className="swiper-logo h-12 w-12 rounded-full"
            alt="Swiper"
            width="129"
            height="129"
            viewBox="0 0 129 129"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M97.5869496,9.51093626 C115.83804,20.7848256 128,40.9721238 128,64 C128,99.346224 99.346224,128 64,128 C56.2920179,128 48.9022945,126.637372 42.0606106,124.137797 L41.3296807,123.865645 L42.5199148,123.48344 L44.0499006,122.981598 L44.8047554,122.729449 L44.8047554,122.729449 L45.5528525,122.476476 L47.0287766,121.968044 L48.477679,121.456268 L49.8995657,120.941118 L51.2944429,120.422561 L51.9817549,120.161995 L53.3361292,119.638268 C54.7663971,119.077773 56.1505947,118.511327 57.4887554,117.938757 L58.4837445,117.508179 L59.7032082,116.966702 C60.2391997,116.725238 60.7672019,116.482694 61.2872173,116.239057 L62.0612505,115.87278 L63.1998411,115.320271 L63.7590314,115.042615 L63.7590314,115.042615 L64.3114862,114.76402 L65.3961918,114.203997 C74.5017145,109.427674 80.6883363,104.239002 83.9729034,98.5499653 C90.9321253,86.4962393 84.8542511,73.6150855 67.4065187,60.4830885 L65.9866432,59.4185495 L65.1241488,58.7570907 L64.2867532,58.1006716 L63.4743719,57.4492672 L62.6869203,56.8028527 L62.3025167,56.4815088 L62.3025167,56.4815088 L61.9243138,56.161403 L61.1864678,55.5248932 L60.6492814,55.0507377 L60.6492814,55.0507377 L60.1259396,54.5793364 L59.4496246,53.9550673 L58.7977741,53.3356509 L58.1703034,52.7210621 L57.865684,52.4155703 L57.865684,52.4155703 L57.5671278,52.1112761 L56.9881629,51.5062679 C50.0910281,44.1742986 48.550875,37.8976624 51.6821025,32.4742173 C53.275799,29.713854 56.0387768,26.999998 59.9662039,24.3569485 L60.4430842,24.040124 L61.1940488,23.5569049 C61.5336196,23.3425039 61.8809347,23.1285905 62.2359916,22.9151777 L62.7743828,22.5954356 L63.603739,22.1172522 L64.4592124,21.6408141 L65.1179529,21.2846511 L65.1179529,21.2846511 L65.7913778,20.9295026 L66.7121153,20.4575739 C67.4124544,20.1043216 68.1348104,19.7526404 68.8791706,19.4025938 L69.6308651,19.0530944 L70.6559388,18.5888147 L71.1782513,18.3574212 L72.2424237,17.8961475 L72.7842819,17.6662758 L73.887538,17.2080833 L74.4489343,16.9797709 L75.5912592,16.5247346 L76.1721862,16.2980192 L77.353565,15.8462143 L78.5609715,15.3966054 L79.174433,15.1726349 L80.4208685,14.7263826 L81.6933149,14.2824097 L82.9917658,13.8407497 L83.6507409,13.6207974 L84.9881859,13.1826691 L86.3516187,12.7469371 L87.7410327,12.3136347 L89.1564212,11.8827954 L90.5977776,11.4544525 L92.4359804,10.9225852 L94.3147346,10.394736 L96.6227494,9.76671243 L97.5869496,9.51093626 Z M64,0 C71.7830114,0 79.2415381,1.38928435 86.1411179,3.93339103 L86.8782091,4.21038217 L86.4108627,4.35186467 L84.1313124,5.0545346 L83.3848908,5.2905768 L81.9121853,5.76541455 L80.4663248,6.24395126 L79.0473024,6.72622031 L77.6551115,7.21225509 L76.2897456,7.70208898 L75.6171199,7.94844102 L73.9648828,8.56854028 L72.3545311,9.19471909 L71.0963985,9.70008321 L70.4773795,9.95425044 L69.2594321,10.4655761 C56.8123589,15.7699668 48.6548341,21.7176 44.7538993,28.4742173 C37.9453585,40.2669559 44.1208291,52.9796592 61.5702618,66.1081375 L62.9900625,67.1727537 L63.8522936,67.8346365 L64.6892575,68.491774 L65.09829,68.8185721 L65.8975078,69.468645 L66.4804703,69.9531308 L66.4804703,69.9531308 L67.0493707,70.4349994 L67.7860906,71.0734406 L68.1451248,71.3909334 L68.8445933,72.0224812 C69.2263095,72.3720718 69.5965761,72.7195512 69.9554568,73.0649416 L70.4852463,73.5814631 L71.248012,74.3504059 L71.9726186,75.1123909 C78.8402712,82.495364 80.3081527,88.8974997 77.0447002,94.5499653 C74.933031,98.2074836 70.9013706,101.807999 64.958951,105.303275 L64.4134675,105.620736 L63.5293583,106.121564 L62.6189315,106.620891 C62.1058295,106.897871 61.5805462,107.174142 61.0430864,107.449677 L60.227765,107.862426 L59.2252746,108.356245 L58.1964941,108.848418 L57.1414295,109.338914 L56.6040425,109.583523 L55.5095633,110.071443 L54.3888152,110.557607 L53.2418044,111.041982 L52.6584524,111.283488 L51.4720589,111.76512 L50.869019,112.005238 L50.869019,112.005238 L50.259418,112.244884 L49.0205357,112.722748 L47.755418,113.19868 L46.4640712,113.672647 L45.1465013,114.144619 L43.8027143,114.614564 L43.1209914,114.848766 L41.7378904,115.315609 L41.0365138,115.548243 L39.6141124,116.011914 L38.1655184,116.47343 L36.3179518,117.047246 L34.4294807,117.617582 L32.8892605,118.071305 L30.739698,118.689489 C12.3072163,107.455464 0,87.1649844 0,64 C0,28.653776 28.653776,0 64,0 Z"
              transform="translate(.335 .835)"
              fill="#0080FF"
            />
          </svg>
          <span className="ml-2 text-2xl font-bold text-primary">Swiper</span>
          <span className="relative top-px ml-2 font-mono text-[10px] text-on-surface opacity-75">
            v{process.env.swiperReleaseVersion}
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center space-x-2">
          <div
            className={`fixed right-0 top-0 z-40 h-full w-full bg-black bg-opacity-10 md:!hidden ${
              navOpened ? 'block' : 'hidden'
            }`}
            onClick={() => setNavOpened(false)}
          />
          <ul
            className={`fixed right-0 top-0 z-50 h-screen w-56 items-center overflow-auto  bg-surface-3 md:relative md:top-0 md:z-auto md:h-auto md:w-auto md:space-x-2 md:overflow-visible md:rounded-none md:bg-transparent ${
              navOpened ? 'block' : 'hidden'
            } md:!flex`}
            onClick={onNavClick}
          >
            <li className="group relative border-b border-outline px-3 py-4 md:border-none md:p-0">
              <div className="flex h-7 cursor-pointer items-center rounded-md px-3 text-sm font-medium text-primary hover:bg-primary hover:text-on-primary">
                Docs
              </div>
              <ul className="right-0 top-full space-y-1 whitespace-nowrap rounded-xl bg-surface-3 px-3 pb-0 pt-4 text-sm group-hover:block md:absolute md:hidden md:py-4">
                <li>
                  <Link
                    href="/get-started"
                    className="block rounded-md px-3 py-1 font-medium leading-6 hover:bg-primary hover:text-on-primary hover:no-underline"
                  >
                    Getting Started
                  </Link>
                </li>
                <li className="!my-3 hidden h-px bg-outline-variant md:block" />
                <li>
                  <Link
                    href="/swiper-api"
                    className="block rounded-md px-3 py-1 font-medium leading-6 hover:bg-primary hover:text-on-primary hover:no-underline"
                  >
                    Swiper Core / API
                  </Link>
                </li>
                <li>
                  <Link
                    href="/element"
                    className="block rounded-md px-3 py-1 font-medium leading-6 hover:bg-primary hover:text-on-primary hover:no-underline"
                  >
                    Swiper Element
                  </Link>
                </li>
                <li>
                  <Link
                    href="/react"
                    className="block rounded-md px-3 py-1 font-medium leading-6 hover:bg-primary hover:text-on-primary hover:no-underline"
                  >
                    Swiper React
                  </Link>
                </li>
                <li>
                  <Link
                    href="/vue"
                    className="block rounded-md px-3 py-1 font-medium leading-6 hover:bg-primary hover:text-on-primary hover:no-underline"
                  >
                    Swiper Vue
                  </Link>
                </li>
                <li className="!my-3 hidden h-px bg-outline-variant md:block" />
                <li>
                  <Link
                    href="/changelog"
                    className="block rounded-md px-3 py-1 font-medium leading-6 hover:bg-primary hover:text-on-primary hover:no-underline"
                  >
                    Changelog
                  </Link>
                </li>
              </ul>
            </li>
            <li className="group relative border-b border-outline px-3 py-4 md:border-none md:p-0">
              <div className="flex h-7 cursor-pointer items-center rounded-md px-3 text-sm font-medium text-primary hover:bg-primary hover:text-on-primary">
                Resources
              </div>
              <ul className="right-0 top-full space-y-1 whitespace-nowrap rounded-xl bg-surface-3 px-3 pb-0 pt-4 text-sm group-hover:block md:absolute md:hidden md:py-4">
                <li>
                  <Link
                    href="/demos"
                    className="block rounded-md px-3 py-1 font-medium leading-6 hover:bg-primary hover:text-on-primary hover:no-underline"
                  >
                    Demos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/plugins"
                    className="block rounded-md px-3 py-1 font-medium leading-6 hover:bg-primary hover:text-on-primary hover:no-underline"
                  >
                    Plugins
                  </Link>
                </li>
                <li className="!my-3 hidden h-px bg-outline-variant md:block" />
                <li>
                  <Link
                    href="/sponsors"
                    className="block rounded-md px-3 py-1 font-medium leading-6 hover:bg-primary hover:text-on-primary hover:no-underline"
                  >
                    Sponsors
                  </Link>
                </li>
              </ul>
            </li>
            <li className="group relative border-b border-outline px-3 py-4 md:border-none md:p-0">
              <div className="flex h-7 cursor-pointer items-center rounded-md px-3 text-sm font-medium text-primary hover:bg-primary hover:text-on-primary">
                Premium
              </div>
              <ul className="right-0 top-full space-y-1 whitespace-nowrap rounded-xl bg-surface-3 px-3 pb-0 pt-4 text-sm group-hover:block md:absolute md:hidden md:py-4">
                <li>
                  <Link
                    href="https://uiinitiative.com"
                    className="block rounded-md px-3 py-1 font-medium leading-6 hover:bg-primary hover:text-on-primary hover:no-underline"
                  >
                    UI Initiative
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://studio.swiperjs.com"
                    target="_blank"
                    className="block rounded-md px-3 py-1 font-medium leading-6 hover:bg-primary hover:text-on-primary hover:no-underline"
                  >
                    Swiper Studio
                  </Link>
                </li>
              </ul>
            </li>
            <li className="group relative border-b border-outline px-3 py-4 md:border-none md:p-0">
              <Link
                href="/blog"
                className="flex h-7 cursor-pointer items-center rounded-md px-3 text-sm font-medium text-primary hover:bg-primary hover:text-on-primary hover:no-underline"
              >
                Blog
              </Link>
            </li>
            <li className="group relative px-3 py-4 md:p-0">
              <Link
                href="https://github.com/nolimits4web/swiper"
                className="flex h-7 cursor-pointer items-center rounded-md px-3 text-sm font-medium text-primary hover:bg-primary hover:text-on-primary hover:no-underline"
                rel="noopener"
                target="_blank"
              >
                <GithubStats />
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="flex h-7 cursor-pointer items-center rounded-md px-3 text-sm font-medium text-primary hover:bg-primary hover:text-on-primary md:hidden"
            onClick={() => {
              setNavOpened(true);
            }}
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
              fill="currentColor"
            >
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          </button>
          <div className="group relative">
            <div className="flex h-7 cursor-pointer items-center rounded-md px-3 text-sm font-medium text-primary hover:bg-primary hover:text-on-primary">
              <svg
                className="h-6 w-6 dark:hidden"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                fill="currentColor"
              >
                <path d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM80-440q-17 0-28.5-11.5T40-480q0-17 11.5-28.5T80-520h80q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440H80Zm720 0q-17 0-28.5-11.5T760-480q0-17 11.5-28.5T800-520h80q17 0 28.5 11.5T920-480q0 17-11.5 28.5T880-440h-80ZM480-760q-17 0-28.5-11.5T440-800v-80q0-17 11.5-28.5T480-920q17 0 28.5 11.5T520-880v80q0 17-11.5 28.5T480-760Zm0 720q-17 0-28.5-11.5T440-80v-80q0-17 11.5-28.5T480-200q17 0 28.5 11.5T520-160v80q0 17-11.5 28.5T480-40ZM226-678l-43-42q-12-11-11.5-28t11.5-29q12-12 29-12t28 12l42 43q11 12 11 28t-11 28q-11 12-27.5 11.5T226-678Zm494 495-42-43q-11-12-11-28.5t11-27.5q11-12 27.5-11.5T734-282l43 42q12 11 11.5 28T777-183q-12 12-29 12t-28-12Zm-42-495q-12-11-11.5-27.5T678-734l42-43q11-12 28-11.5t29 11.5q12 12 12 29t-12 28l-43 42q-12 11-28 11t-28-11ZM183-183q-12-12-12-29t12-28l43-42q12-11 28.5-11t27.5 11q12 11 11.5 27.5T282-226l-42 43q-11 12-28 11.5T183-183Z" />
              </svg>
              <svg
                className="hidden h-6 w-6 dark:block"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                fill="currentColor"
              >
                <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z" />
              </svg>
            </div>
            <ul className="absolute right-0 top-full hidden space-y-1 whitespace-nowrap rounded-xl bg-surface-3 px-3 py-4 text-sm group-hover:block">
              <li>
                <button
                  type="button"
                  onClick={() => setSetting('light')}
                  className="flex w-full items-center space-x-3 rounded-md px-3 py-1 font-medium leading-6 text-primary hover:bg-primary hover:text-on-primary hover:no-underline"
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    fill="currentColor"
                  >
                    <path d="M480-280q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM80-440q-17 0-28.5-11.5T40-480q0-17 11.5-28.5T80-520h80q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440H80Zm720 0q-17 0-28.5-11.5T760-480q0-17 11.5-28.5T800-520h80q17 0 28.5 11.5T920-480q0 17-11.5 28.5T880-440h-80ZM480-760q-17 0-28.5-11.5T440-800v-80q0-17 11.5-28.5T480-920q17 0 28.5 11.5T520-880v80q0 17-11.5 28.5T480-760Zm0 720q-17 0-28.5-11.5T440-80v-80q0-17 11.5-28.5T480-200q17 0 28.5 11.5T520-160v80q0 17-11.5 28.5T480-40ZM226-678l-43-42q-12-11-11.5-28t11.5-29q12-12 29-12t28 12l42 43q11 12 11 28t-11 28q-11 12-27.5 11.5T226-678Zm494 495-42-43q-11-12-11-28.5t11-27.5q11-12 27.5-11.5T734-282l43 42q12 11 11.5 28T777-183q-12 12-29 12t-28-12Zm-42-495q-12-11-11.5-27.5T678-734l42-43q11-12 28-11.5t29 11.5q12 12 12 29t-12 28l-43 42q-12 11-28 11t-28-11ZM183-183q-12-12-12-29t12-28l43-42q12-11 28.5-11t27.5 11q12 11 11.5 27.5T282-226l-42 43q-11 12-28 11.5T183-183Z" />
                  </svg>
                  <span>Light</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setSetting('dark')}
                  className="flex w-full items-center space-x-3 rounded-md px-3 py-1 font-medium leading-6 text-primary hover:bg-primary hover:text-on-primary hover:no-underline"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z" />
                  </svg>
                  <span>Dark</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setSetting('system')}
                  className="flex w-full items-center space-x-3 rounded-md px-3 py-1 font-medium leading-6 text-primary hover:bg-primary hover:text-on-primary hover:no-underline"
                >
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="M80-160v-120h80v-440q0-33 23.5-56.5T240-800h600v80H240v440h240v120H80Zm520 0q-17 0-28.5-11.5T560-200v-400q0-17 11.5-28.5T600-640h240q17 0 28.5 11.5T880-600v400q0 17-11.5 28.5T840-160H600Zm40-120h160v-280H640v280Z" />
                  </svg>
                  <span>System</span>
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
