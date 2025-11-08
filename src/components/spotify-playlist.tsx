"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Music, 
  Play, 
  Plus, 
  ExternalLink, 
  Users, 
  Volume2,
  Shuffle,
  SkipForward,
  Heart
} from "lucide-react";

interface SpotifyPlaylistProps {
  tripId: string;
  tripName: string;
  isSpotifyConnected: boolean;
  onConnectSpotify: () => void;
}

interface Playlist {
  id: string;
  name: string;
  spotifyUrl: string;
  trackCount: number;
  duration: string;
  collaborative: boolean;
  contributors: string[];
  coverImage?: string;
}

export function SpotifyPlaylist({ tripId, tripName, isSpotifyConnected, onConnectSpotify }: SpotifyPlaylistProps) {
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [playlistName, setPlaylistName] = useState(`${tripName} - Trip Playlist`);

  const handleCreatePlaylist = async () => {
    setIsCreating(true);
    try {
      // Simulate API call to create Spotify playlist
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newPlaylist: Playlist = {
        id: `playlist_${tripId}`,
        name: playlistName,
        spotifyUrl: `https://open.spotify.com/playlist/${Math.random().toString(36)}`,
        trackCount: 0,
        duration: "0 min",
        collaborative: true,
        contributors: ["You"],
        coverImage: undefined
      };
      
      setPlaylist(newPlaylist);
    } catch (error) {
      console.error("Failed to create playlist:", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handlePlayPlaylist = () => {
    if (playlist) {
      // Open Spotify app/web player
      window.open(playlist.spotifyUrl, '_blank');
    }
  };

  if (!isSpotifyConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="h-5 w-5 text-green-500" />
            Trip Playlist
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="flex flex-col items-center gap-3">
            <div className="bg-green-50 p-3 rounded-full">
              <Music className="h-8 w-8 text-green-500" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Connect Spotify</h3>
              <p className="text-sm text-gray-600 mt-1">
                Create collaborative playlists for your trip that all members can contribute to
              </p>
            </div>
          </div>
          <Button 
            onClick={onConnectSpotify}
            className="w-full bg-green-500 hover:bg-green-600 text-white"
          >
            <Music className="h-4 w-4 mr-2" />
            Connect to Spotify
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!playlist) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music className="h-5 w-5 text-green-500" />
            Trip Playlist
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-2 block">Playlist Name</Label>
            <Input
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              placeholder="Enter playlist name"
              className="w-full"
            />
          </div>
          
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-start gap-2">
              <Users className="h-4 w-4 text-green-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-green-800">Collaborative Playlist</p>
                <p className="text-green-700 text-xs mt-1">
                  All trip members will be able to add songs and the playlist will sync across everyone's Spotify
                </p>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleCreatePlaylist}
            disabled={isCreating || !playlistName.trim()}
            className="w-full bg-green-500 hover:bg-green-600 text-white"
          >
            {isCreating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Creating Playlist...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Create Trip Playlist
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music className="h-5 w-5 text-green-500" />
            Trip Playlist
          </div>
          <Badge variant="secondary" className="text-green-600 bg-green-50">
            <Users className="h-3 w-3 mr-1" />
            Collaborative
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
            <Music className="h-8 w-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{playlist.name}</h3>
            <p className="text-sm text-gray-600">
              {playlist.trackCount} songs • {playlist.duration}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Contributors: {playlist.contributors.join(", ")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button 
            onClick={handlePlayPlaylist}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            <Play className="h-4 w-4 mr-2" />
            Play on Spotify
          </Button>
          <Button 
            onClick={() => window.open(playlist.spotifyUrl, '_blank')}
            variant="outline"
            className="border-green-200 text-green-700 hover:bg-green-50"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Open in Spotify
          </Button>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Quick Controls</span>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <Shuffle className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <SkipForward className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <Volume2 className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500 text-center">
          Playlist will automatically appear in all trip members' Spotify libraries
        </div>
      </CardContent>
    </Card>
  );
}