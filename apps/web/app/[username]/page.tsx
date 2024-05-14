import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CircleEllipsis, EclipseIcon, ShieldEllipsis, ShieldQuestionIcon } from "lucide-react";
import Image from "next/image";

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center px-2 py-2 sm:px-8">
            <div className="flex w-[75%] flex-col items-center justify-center">
                {/* header with avatar and banner */}
                <div className="full flex w-full flex-col items-center">
                    <img
                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.dogtagart.com%2Fsites%2Fdefault%2Ffiles%2Fhotdog2.jpg&f=1&nofb=1&ipt=856ccdef5ed27fbf9c3fe6401ef180950db2cee15197b6a65baafc08e4582a43&ipo=images"
                        className="aspect-banner w-full rounded-xl object-cover object-center"
                    />
                    <div className="-mt-4 flex w-full items-center justify-between gap-4">
                        <div className="ml-4 flex items-center gap-4">
                            <Image
                                src="https://storage.ko-fi.com/cdn/useruploads/c8950ffd-5e9b-4837-9350-d3aad5f6acef_b90ba1ab-a73f-43a6-9d34-327dd16c8dc0.png"
                                alt="avatar"
                                className="h-28 w-28 rounded-full border-4"
                                width={112}
                                height={112}
                            />
                            <div>
                                <h1 className="font-serif text-3xl font-bold">dickey</h1>
                                <p className="text-foreground/60 text-sm">tip.dev/dickey</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button className="bg-muted text-foreground hover:bg-muted/70 text-md px-12 font-serif">
                                Follow
                            </Button>
                            <Button variant={"ghost"}>
                                <ShieldQuestionIcon className="text-foreground/80 h-6 w-6" />
                            </Button>
                        </div>
                    </div>
                </div>

                <Separator className="my-8 bg-white/10" />

                <div className="grid w-full grid-cols-2 gap-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Card 1</CardTitle>
                            <CardDescription>Card 1 description</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card 1 content</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>About dickey</CardTitle>
                            <CardDescription>Card 1 description</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p>Card 1 content</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    );
}
