import "reflect-metadata";
import { MicroServiceApp } from "./app";
import { Container } from "typedi";

const microServiceApp = Container.get(MicroServiceApp);

microServiceApp.listen();
