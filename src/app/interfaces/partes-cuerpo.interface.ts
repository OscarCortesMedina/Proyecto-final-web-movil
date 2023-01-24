export interface partesCuerpo {
    cabezaFrente:parteCuerpo[],
    cabezaEspalda:parteCuerpo[],
    brazoIzqFrente:parteCuerpo[],
    brazoIzqEspalda:parteCuerpo[],
    brazoDerFrente:parteCuerpo[],
    brazoDerEspalda:parteCuerpo[],
    pieIzqFrente:parteCuerpo[],
    pieIzqEspalda:parteCuerpo[],
    pieDerFrente:parteCuerpo[],
    pieDerEspalda:parteCuerpo[],
    piernaIzqFrente:parteCuerpo[],
    piernaIzqEspalda:parteCuerpo[],
    piernaDerFrente:parteCuerpo[],
    piernaDerEspalda:parteCuerpo[],
    torsoFrente:parteCuerpo[],
    torsoEspalda:parteCuerpo[]

}


interface parteCuerpo {
    id: number,
    nombre: string
}