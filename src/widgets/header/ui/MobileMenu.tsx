"use client"

import { Project } from "@/src/entity/projects"
import { PAGES_CONFIG } from "@/src/shared/configs/pages"
import {
  Button,
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
  Show,
} from "@/src/shared/ui"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { DRAWER_ACCOUNT_LINKS } from "../model/const"
import { ProjectSelector } from "./ProjectSelector"

interface MobileMenuProps {
  isAuth: boolean
  projects: Project[]
}

export const MobileMenu = ({ isAuth, projects }: MobileMenuProps) => {
  return (
    <Drawer direction="right">
      <DrawerTrigger className="sm:hidden" asChild>
        <Button variant="ghost" size="icon">
          <Menu className="size-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="flex w-full! flex-col">
        <DrawerHeader className="flex flex-row items-center justify-between gap-3 border-b">
          <Show when={isAuth}>
            <ProjectSelector projects={projects} />
          </Show>
          <DrawerClose asChild>
            <Button className="rounded-md" variant="ghost" size="icon">
              <X />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <nav className="flex-1 overflow-y-auto p-4">
          {isAuth && (
            <div className="mb-6">
              <span className="mb-2 block text-xs font-bold tracking-wider text-foreground/50 uppercase">
                Profile
              </span>

              <ul className="flex flex-col gap-1">
                {DRAWER_ACCOUNT_LINKS.map((link) => {
                  const Icon = link.icon

                  return (
                    <li className="flex-1" key={link.href}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3"
                        asChild
                      >
                        <DrawerClose asChild>
                          <Link href={link.href}>
                            <Icon className="size-4" />
                            {link.key}
                          </Link>
                        </DrawerClose>
                      </Button>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </nav>

        <div className="border-t p-4">
          {isAuth ? (
            <Button variant="destructive" className="w-full">
              Sign Out{" "}
            </Button>
          ) : (
            <div className="flex flex-col gap-2">
              <Button asChild>
                <Link href={PAGES_CONFIG.AUTH.GITHUB_OAUTH}>
                  Sign In wia GitHub
                </Link>
              </Button>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
