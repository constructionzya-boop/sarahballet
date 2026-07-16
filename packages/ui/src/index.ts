// @noema/ui — barrel d'exports du design system.

export { cn } from "./lib/cn";

export { Button, type ButtonProps } from "./components/button";
export { Badge, type BadgeProps } from "./components/badge";
export { Card, CardHeader, CardTitle, CardBody, CardFooter } from "./components/card";
export { Heading, type HeadingProps, Text, Eyebrow } from "./components/typography";
export { Container, Section } from "./components/container";
export { Input } from "./components/input";
export { Textarea } from "./components/textarea";
export { Label } from "./components/label";
export { Select } from "./components/select";
export { Divider } from "./components/divider";
export { Link } from "./components/link";
export { Alert, type AlertProps } from "./components/alert";
export { WhatsAppButton, type WhatsAppButtonProps } from "./components/whatsapp-button";
export {
  BrandSwitcher,
  type BrandSwitcherProps,
  type BrandLink,
  NOEMA_BRANDS,
} from "./components/brand-switcher";
export { TrustBar, type TrustBarProps, type TrustItem } from "./components/trust-bar";
export { CaseStudyCard, type CaseStudyCardProps } from "./components/case-study-card";

/* — DA « vitrine minimale animée » (mission SITE-002) — */

// Primitives d'animation (Framer Motion / LazyMotion).
export {
  MotionProvider,
  Reveal,
  RevealGroup,
  RevealItem,
  AnimatedNumber,
  EASE_OUT,
  m,
  type RevealProps,
  type AnimatedNumberProps,
} from "./components/motion";

// Composants visuels & animés.
export { StatCard, type StatCardProps } from "./components/stat-card";
export { FeatureCardDark, type FeatureCardDarkProps } from "./components/feature-card-dark";
export { OfferCard, type OfferCardProps } from "./components/offer-card";
export { PaymentCard, type PaymentCardProps } from "./components/payment-card";
export { ProcessStep, type ProcessStepProps } from "./components/process-step";
export { MaskedPhoto, type MaskedPhotoProps, type MaskVariant } from "./components/masked-photo";
export {
  SectionDivider,
  type SectionDividerProps,
  type DividerVariant,
  type ColorToken,
} from "./components/section-divider";
export { FloatingPill, type FloatingPillProps } from "./components/floating-pill";
export { Marquee, type MarqueeProps } from "./components/marquee";
export { TimelinePose, type PoseStep } from "./components/timeline-pose";
export { AccordionFAQ, type FaqItem } from "./components/accordion-faq";
export { TestimonialCard, type TestimonialCardProps } from "./components/testimonial-card";
export { WhatsAppFAB, type WhatsAppFabProps } from "./components/whatsapp-fab";
export { StickyNav, type StickyNavProps, type NavLink } from "./components/sticky-nav";
export {
  ConfiguratorTeaser,
  type ConfiguratorTeaserProps,
  type TeaserPreset,
} from "./components/configurator-teaser";
