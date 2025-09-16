import { MousePointerClick, Sparkles, ShieldCheck } from "lucide-react"
import { useTranslation } from "react-i18next"

export const useFeaturesData = () => {
  const { t } = useTranslation()

  return [
    {
      title: t("features.easeTitle"),
      description: t("features.easeDescription"),
      icon: <MousePointerClick className="w-6 h-6" />,
    },
    {
      title: t("features.qualityTitle"),
      description: t("features.qualityDescription"),
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      title: t("features.securityTitle"),
      description: t("features.securityDescription"),
      icon: <ShieldCheck className="w-6 h-6" />,
    },
  ]
}
