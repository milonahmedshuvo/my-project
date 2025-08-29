import { WebsiteCheckResult } from "@/types/website-result";
import { platform } from "os";
import React, { useState } from "react";

type Tracker = {
  name: string;
  platform: string;
  purpose: string;
  keywords: string[];
};

type LighthouseResultFlat = {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
};

type AllLighthouseData = {
  mobile: LighthouseResultFlat | null;
  desktop: LighthouseResultFlat | null;
};




const useWebsiteAnalyzer = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ results, setResults ] = useState<WebsiteCheckResult | null>(null)

  const validatedUrl = (input: string) => {
    try {
      new URL(input.startsWith("htpp") ? input : `https://${input}`);
      return true;
    } catch {
      return false;
    }
  };

  const websiteAnalyze = async (url: string) => {

    if (!url.trim()) {
      setError("Please enter a website URL");
      return;
    }

    if (!validatedUrl(url)) {
      setError("Please enter a valid URL");
      return;
    }

    setLoading(true);
    setError(null);

    //  main or parent try & catch
    try {
      const fullUrl = url.startsWith("http") ? url : `https://${url}`;
      let content = "";
      let fetchSuccessful = false;

      // Try to fetch website content by url
      try {
        const response1 = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(fullUrl)}`
        );
        const data1 = await response1.json();

        if (
          data1.contents &&
          data1.contents.trim() &&
          !data1.contents.includes("Clone failed")
        ) {
          content = data1.contents.toLowerCase();
          fetchSuccessful = true;
        }
      } catch (e) {
        console.log("Primary proxy failed, trying backup...");
      }

      if (!fetchSuccessful) {
        try {
          const response2 = await fetch(
            `https://thingproxy.freeboard.io/fetch/${fullUrl}`
          );
          if (response2.ok) {
            content = (await response2.text()).toLowerCase();
            fetchSuccessful = true;
          }
        } catch (err) {
          console.log("Backup proxy failed");
        }
      }
      // remove fallback
      if (!fetchSuccessful) {
        setError(
          "Website content fetch, please verify URL and see if the site is publicly accessible"
        );
        setLoading(false);
        return;
      }





      // get domain
      const domain = new URL(fullUrl).hostname;
      const googleAnalyticsKeywords = [
        "googletagmanager.com/gtag/js",
        "google-analytics.com/analytics.js",
        "google-analytics.com/ga.js",
        "googleadservices.com/pagead/conversion.js",
        "googleads.g.doubleclick.net",
        "adsbygoogle.js",
        "gtag('config'",
        "gtag('event'",
        "__gaTracker",
        "gtm.js",
        "AW-",
        "googletagmanager",
        "gtag",
        "google-analytics",
        "ga(",
      ];
      const facebookPixelKeywords = [
        "facebook.com/tr/",
        "connect.facebook.net/en_US/fbevents.js",
        "fbq(",
        "fbq('init'",
        "fbq('track'",
        "fbq('track', 'PageView'",
        "fbq('track', 'Purchase'",
        "fbq('track', 'Lead'",
        "fbq('track', 'ViewContent'",
        "fbq('trackCustom'",
        "https://www.facebook.com/tr",
        "noscript",
        "connect.facebook.net",
        "facebook.net",
        "fbpixel",
        "fbq(",
      ];
      const detectGoogleAnalytics = (content:string) => {
        return googleAnalyticsKeywords.some((keyword) => content.includes(keyword))
      }
      const detectFacebookPixel = (content:string) => {
        return facebookPixelKeywords.some((keyword)=> content.includes(keyword))
      }
      const hasGoogleAnalytics = detectGoogleAnalytics(content)
      const hasFacebookPixel = detectFacebookPixel(content)


    //  ads google and meta data : 
    const ads = {
        googleAds : hasGoogleAnalytics ? [
            {
                title: `${domain} Campaign`,
                platform: "Google Ads",
                status: "Detected from script",
              },
        ] : [],
        metaAds : hasFacebookPixel ? [
            {
                title: `${domain} Ads`,
                platform: "Meta Ads",
                status: "Detected from Pixel/Script",
              },
        ]: []
    }

    // chatSystems data it 
    const keywordChecks:Record<string, string[]> = {
        hasPrivacyPolicy: [
          "privacy policy",
          "/privacy-policy",
          "privacy.html",
          "privacy.html",
          "privacy.htm",
          "privacy/",
          "privacy-policy.html",
          "data protection",
          "gdpr",
        ],
        hasCookiePolicy: [
          "cookie policy",
          "/cookie-policy",
          "cookie.html",
          "cookies-policy.html",
          "cookieconsent",
          "cookie banner",
          "cookie-consent",
          "cookie_settings",
          "cookie-preferences",
          "cookies.js",
        ],
        hasYouTube: [
          "youtube.com/embed",
          "youtube.com/watch",
          "youtube-nocookie.com",
          "youtu.be",
          "i.ytimg.com", // thumbnail
          "youtube.com/iframe_api",
          "ytplayer",
        ],
        hasGoogleFonts: [
          "fonts.googleapis.com",
          "fonts.gstatic.com",
          "use.typekit.net", // Adobe Fonts (optional addition)
          "fonts.bunny.net", // Bunny CDN alternative
        ],
        isWordPress: [
          "wp-content",
          "wp-includes",
          "wp-json",
          "wp-admin",
          "wp-",
          "xmlrpc.php",
          "wordpress",
          "wp-login.php",
        ],
    }
    const results: Record<string, boolean> = {};
    
    for (const [key, keywords] of Object.entries(keywordChecks)){
      results[key] = keywords.some((keywords)=> content.toLowerCase().includes(keywords))
    }

    const {  hasPrivacyPolicy, hasCookiePolicy, hasYouTube, hasGoogleFonts, isWordPress, } = results;

     // I have use DRY principle that easy maintainable and readable
      const chatSystemsMap: Record<string, string[]> = {
        Intercom: [
          "widget.intercom.io",
          "intercom.com",
          "intercomcdn",
          "intercomcdn.com",
        ],
        WhatsApp: [
          "wa.me",
          "web.whatsapp.com",
          "chat.whatsapp.com",
          "whatsapp://",
        ],
        Telegram: [
          "t.me",
          "telegram.org",
          "telegram.me",
          "telegram.org/js/telegram-widget.js",
        ],
        "Tawk.to": ["embed.tawk.to", "tawk.to"],
        "Zendesk Chat": [
          "zopim.com",
          "zdassets.com",
          "zendesk.com",
          "static.zdassets.com",
          "zendesk.com/embeddable_framework",
        ],
        LiveChat: [
          "cdn.livechatinc.com",
          "livechat.com",
          "livechatinc",
          "livechat.com/tracking.js",
          "livechatinc.com",
        ],
        "Crisp Chat": ["crisp.chat", "client.crisp.chat"],
        Drift: ["js.driftt.com", "drift.com"],
        Freshchat: ["wchat.freshchat.com", "freshchat.com"],
        "Facebook Messenger": [
          "connect.facebook.net",
          "fb-customerchat",
          "connect.facebook.net/en_US/sdk/xfbml.customerchat.js",
        ],
        "Meta-pixel": [
          "facebook.com/tr",
          "fbq('track'",
          "https://connect.facebook.net",
        ],
      };
      const chatSystemsSet = new Set<string>()

      for(const [stystem, keywords] of Object.entries(chatSystemsMap)){
         if(keywords.some((keyword)=> content.includes(keyword))){
          chatSystemsSet.add(stystem)
         }
      }

    // 3rd party Tracker map data for tracker
      const knownTrackers: Tracker[] = [
        {
          name: "Google Analytics",
          platform: "Google",
          purpose: "Website analytics",
          keywords: [
            "www.googletagmanager.com/gtag/js",
            "www.google-analytics.com/analytics.js",
            "google-analytics.com/ga.js",
            "www.google-analytics.com/plugins/ua/",
            "gtag('config'",
            "__gaTracker",
            "ga('create'",
            "ga('send'",
          ],
        },
        {
          name: "Google Tag Manager",
          platform: "Google",
          purpose: "Tag management",
          keywords: [
            "googletagmanager.com/gtm.js",
            "www.googletagmanager.com",
            "gtm.start",
            "dataLayer.push",
            "GTM-",
          ],
        },
        {
          name: "Facebook Pixel",
          platform: "Meta",
          purpose: "Advertising tracking",
          keywords: [
            "connect.facebook.net/en_US/fbevents.js",
            "www.facebook.com/tr",
            "fbq(",
            "fbq('init'",
            "fbq('track'",
            "fbq('track', 'PageView'",
            "fbq('track', 'Purchase'",
            "fbq('track', 'Lead'",
            "fbq('track', 'ViewContent'",
            "fbq('trackCustom'",
          ],
        },
        {
          name: "Hotjar",
          platform: "Hotjar",
          purpose: "User behavior analytics",
          keywords: [
            "static.hotjar.com/c/hotjar-",
            "script.hotjar.com",
            "window.hj=",
            "hj('trigger'",
            "hj('event'",
          ],
        },
        {
          name: "LinkedIn Insight Tag",
          platform: "LinkedIn",
          purpose: "B2B advertising tracking",
          keywords: [
            "snap.licdn.com/li.lms-analytics/insight.min.js",
            "platform.linkedin.com",
            "linkedin.com/insight",
            "li_lid=",
          ],
        },
        {
          name: "Twitter Pixel",
          platform: "Twitter",
          purpose: "Advertising tracking",
          keywords: [
            "static.ads-twitter.com/uwt.js",
            "analytics.twitter.com",
            "twq('init'",
            "twq('track'",
          ],
        },
        {
          name: "Microsoft Clarity",
          platform: "Microsoft",
          purpose: "User behavior analytics",
          keywords: [
            "clarity.ms",
            "clarity('set'",
            "clarity('identify'",
            "clarity('consent'",
          ],
        },
        {
          name: "Pinterest Tag",
          platform: "Pinterest",
          purpose: "Advertising tracking",
          keywords: [
            "s.pinimg.com/ct/core.js",
            "pintrk('track'",
            "pintrk('load'",
            "pintrk('page'",
          ],
        },
      ];

      const trackersMap = new Map<string, Omit<Tracker, "keywords">>();
      
      for (const tracker of knownTrackers) {
        if (tracker.keywords.some((keyword) => content.includes(keyword))) {
          trackersMap.set(tracker.name, {
            name: tracker.name,
            platform: tracker.platform,
            purpose: tracker.purpose,
          });
        }
      }

      const chatSystems = Array.from(chatSystemsSet)
      const trackers = Array.from(trackersMap.values());
      



   //  lighthourse data
      let usingRealData = false;
      async function fetchAllLighthouseData(
        url: string
      ): Promise<AllLighthouseData> {
        const apiKey = "AIzaSyC-G5boGpgf9BPBDbRquGPeY8ij6ieGqO8";
        const strategies: ("mobile" | "desktop")[] = ["mobile", "desktop"];

        const fetchStrategyData = async (
          strategy: "mobile" | "desktop"
        ): Promise<["mobile" | "desktop", LighthouseResultFlat | null]> => {
          const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
            url
          )}&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&category=SEO&strategy=${strategy}&key=${apiKey}`;

          try {
            const response = await fetch(endpoint);
            const data = await response.json();
            const categories = data.lighthouseResult?.categories;

            return [
              strategy,
              {
                performance: Math.round(
                  (categories?.performance?.score || 0) * 100
                ),
                accessibility: Math.round(
                  (categories?.accessibility?.score || 0) * 100
                ),
                bestPractices: Math.round(
                  (categories?.["best-practices"]?.score || 0) * 100
                ),
                seo: Math.round((categories?.seo?.score || 0) * 100),
              },
            ];
          } catch (error) {
            console.error(`Error fetching ${strategy} data:`, error);
            return [strategy, null];
          }
        };

        const results = await Promise.all(strategies.map(fetchStrategyData));

        const data: AllLighthouseData = {
          mobile:
            results.find(([strategy]) => strategy === "mobile")?.[1] || null,
          desktop:
            results.find(([strategy]) => strategy === "desktop")?.[1] || null,
        };

        return data;
      }

      // Generate more realistic content analysis
      const hasMetaDescription = content.includes('<meta name="description"');
      const imageCount = (content.match(/<img/g) || []).length;
      const linkCount = (content.match(/<a /g) || []).length;


 // mixcontent
      const mixedImages = [
        ...content.matchAll(/<img[^>]+src=["']http:\/\//gi),
      ].map((m) => m[0]);
      const mixedScripts = [
        ...content.matchAll(/<script[^>]+src=["']http:\/\//gi),
      ].map((m) => m[0]);
      const mixedIframes = [
        ...content.matchAll(/<iframe[^>]+src=["']http:\/\//gi),
      ].map((m) => m[0]);

      const mixedContent = {
        issues:
          (mixedImages.length || mixedScripts.length || mixedIframes.length) > 0
            ? ["Mixed content detected"]
            : [],
        categories: {
          images: mixedImages,
          scripts: mixedScripts,
          iframes: mixedIframes,
          other: [],
        },
      };


      // update initial Result data in state 
      const initialResult:Partial<WebsiteCheckResult> = {
         url: fullUrl,
         security: {
              mixedContent: mixedContent
         },
         integrations: {
          chatSystems: chatSystems,
          trackers : trackers
         },
         legalCompliance : {
           privacyPolicy: hasPrivacyPolicy,
           cookiePolicy: hasCookiePolicy,
           trackingConsent: hasCookiePolicy && (hasGoogleAnalytics || hasFacebookPixel),
           ssl: fullUrl.startsWith('https'),
           formConsent: content.includes('newsletter') && content.includes('consent'),
           embeddedVideos: hasYouTube,
           googleFonts: hasGoogleFonts,
           isWordPress,
           cookies: [
            ...(hasGoogleAnalytics ? [
                  {
                    name: "_ga",
                    platform: "Google Analytics",
                    description: "Analytics tracking",
                    retention: "2 years",
                  },
                ] : []),

              ...(hasFacebookPixel  ? [
                  {
                    name: '_fbp',
                    platform: 'Facebook Pixel',
                    description: 'Ad targeting',
                    retention: '90 days'
                  }
                ] : [] )
           ]
         },

         ads,
      }
   
      console.log({initialResult})

      // update state 
      setResults(initialResult as WebsiteCheckResult)
      setLoading(false)








    } catch (err) {
      setError(
        "Failed to analyze website. Please check the URL and try again."
      );
      console.log("Analyze website", err);
    } finally {
      setLoading(false);
    }
  };



  return {
     loading,
     error,
     websiteAnalyze,
     results
  }
};

export default useWebsiteAnalyzer;
